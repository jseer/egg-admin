'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async create() {
    const { ctx } = this;
    const data = await ctx.service.user.create(ctx.request.body);
    ctx.success(data);
  }

  async login() {
    const { ctx } = this;
    const data = await ctx.service.user.login(ctx.request.body);
    if (data) {
      ctx.session.user = { id: data.id };
      ctx.success(data);
    } else {
      ctx.fail('用户名或者密码不正确');
    }
  }
  async logout() {
    const { ctx } = this;
    ctx.session.user = null;
    ctx.success(true);
  }

  async update() {
    const { ctx } = this;
    await ctx.service.user.update(ctx.request.body);
    ctx.success(true);
  }

  async page() {
    const { ctx } = this;
    const data = await ctx.service.user.page(ctx.query);
    ctx.success(data);
  }

  async removeByIds() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    const result = await ctx.service.user.removeByIds(ids);
    ctx.success(result);
  }

  async getCurrent() {
    const { ctx } = this;
    const { id } = ctx.session.user;
    const userInfo = await ctx.service.user.findById(id);
    if (userInfo) {
      ctx.success(userInfo);
    } else {
      ctx.fail(401, '用户不存在');
    }
  }
}

module.exports = UserController;
