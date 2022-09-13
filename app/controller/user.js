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
    ctx.success(data);
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
}

module.exports = UserController;
