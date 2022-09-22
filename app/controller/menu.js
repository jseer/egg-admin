'use strict';

const { USER_TYPE } = require('../utils/common');

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async create() {
    const { ctx } = this;
    const data = await ctx.service.menu.create(ctx.request.body);
    ctx.success(data);
  }

  async update() {
    const { ctx } = this;
    await ctx.service.menu.update(ctx.request.body);
    ctx.success(true);
  }

  async list() {
    const { ctx } = this;
    const data = await ctx.service.menu.list(ctx.helper.query2where(ctx.query));
    const result = ctx.helper.loopMenus(data);
    ctx.success(result);
  }

  async removeByIds() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    const result = await ctx.service.menu.removeByIds(ids);
    if (result) {
      ctx.fail(result.message, result.code);
    } else {
      ctx.success(true);
    }
  }

  async listByRoleId() {
    const { ctx } = this;
    const data = await ctx.service.menu.listByRoleId(ctx.query.id);
    ctx.success(data);
  }

  async updateStatus() {
    const { ctx } = this;
    await ctx.service.menu.updateStatus(ctx.request.body);
    ctx.success(true);
  }

  async authList() {
    const { ctx, app } = this;
    const {
      config: {
        commonConfig: { superAdmin, touristRoles },
      },
    } = app;
    const user = ctx.session.user;
    let menuList = [];
    if (user.type === USER_TYPE.ACCOUNT) {
      if (user.name === superAdmin) {
        menuList = await ctx.service.menu.list({});
      } else {
        menuList = await ctx.service.menu.authListByAccountUserId(user.id);
      }
    } else if (user.type === USER_TYPE.TOURIST) {
      menuList = await ctx.service.menu.authListByTouristRoles(touristRoles);
    }
    ctx.success(ctx.helper.loopMenus(menuList));
  }
}

module.exports = MenuController;
