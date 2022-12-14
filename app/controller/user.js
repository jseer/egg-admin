'use strict';

const Controller = require('egg').Controller;
const { USER_TYPE, TOURIST_INFO } = require('../utils/common');
const dayjs = require('dayjs');
const NodeRSA = require('node-rsa');

class UserController extends Controller {
  async create() {
    const { ctx } = this;
    const data = await ctx.service.user.create(ctx.request.body);
    ctx.success(data);
  }

  async register() {
    const { ctx, app } = this;
    const body = ctx.request.body;
    const key = new NodeRSA(app.config.rsaInfo.privateKey, {
      encryptionScheme: 'pkcs1',
    });
    body.password = key.decrypt(body.password, 'utf8');
    const data = await ctx.service.user.register(body);
    ctx.success(data);
  }

  async login() {
    const { ctx, app } = this;
    const body = ctx.request.body;
    const key = new NodeRSA(app.config.rsaInfo.privateKey, {
      encryptionScheme: 'pkcs1',
    });
    body.password = key.decrypt(body.password, 'utf8');
    const data = await ctx.service.user.login(body);
    if (data) {
      ctx.session.user = data;
      if (body.remember) {
        const diff = dayjs().endOf('day').diff(dayjs());
        ctx.session.maxAge = diff;
      } else {
        const { commonConfig: { defaultLoginMaxAge } } = app.config;
        ctx.session.maxAge = defaultLoginMaxAge;
      }
      ctx.success(data);
    } else {
      ctx.fail('用户名或者密码不正确');
    }
  }
  async logout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.success(true);
  }

  async update() {
    const { ctx } = this;
    await ctx.service.user.update(ctx.request.body);
    ctx.success(true);
  }

  async page() {
    const { ctx } = this;
    const data = await ctx.service.user.page(ctx.helper.query2where(ctx.query));
    ctx.success(data);
  }

  async list() {
    const { ctx } = this;
    const data = await ctx.service.user.list(ctx.helper.query2where(ctx.query));
    ctx.success(data);
  }

  async removeByIds() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    await ctx.service.user.removeByIds(ids);
    ctx.success(true);
  }

  async getCurrent() {
    const { ctx } = this;
    let userInfo = null;
    if (ctx.session.user.type === USER_TYPE.ACCOUNT) {
      userInfo = await ctx.service.user.findById(ctx.session.user.id);
    } else if (ctx.session.user.type === USER_TYPE.TOURIST) {
      userInfo = TOURIST_INFO;
    }
    if (userInfo) {
      ctx.session.user = userInfo;
      ctx.success(userInfo);
    } else {
      ctx.fail('用户不存在', 401);
    }
  }

  async getListByRoleId() {
    const { ctx } = this;
    const { id } = ctx.query;
    const result = await ctx.service.user.getListByRoleId(id);
    ctx.success(result);
  }

  async getLoginHistory() {
    const { ctx } = this;
    const user = ctx.session.user;
    if (user.type === USER_TYPE.ACCOUNT) {
      const result = await ctx.service.user.getLoginHistory(
        user.id,
        ctx.helper.query2where(ctx.query)
      );
      ctx.success(result);
      return;
    }
    ctx.success([]);
  }

  async validateByNameOrEmail() {
    const { ctx } = this;
    const result = await ctx.service.user.validateByNameOrEmail(ctx.query);
    ctx.success(result);
  }

  async touristLogin() {
    const { ctx, app } = this;
    const result = await ctx.service.loginRecords.create(TOURIST_INFO);
    ctx.session.user = TOURIST_INFO;
    const { commonConfig: { defaultLoginMaxAge } } = app.config;
    ctx.session.maxAge = defaultLoginMaxAge;
    ctx.success(result);
  }
}

module.exports = UserController;
