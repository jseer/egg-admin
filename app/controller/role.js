'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async create() {
    const { ctx } = this;
    const data = await ctx.service.role.create(ctx.request.body);
    ctx.success(data);
  }

  async update() {
    const { ctx } = this;
    await ctx.service.role.update(ctx.request.body);
    ctx.success(true);
  }

  async page() {
    const { ctx } = this;
    const data = await ctx.service.role.page(ctx.query);
    ctx.success(data);
  }

  async list() {
    const { ctx } = this;
    const data = await ctx.service.role.list(ctx.query);
    ctx.success(data);
  }

  async removeByIds() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    const result = await ctx.service.role.removeByIds(ids);
    ctx.success(result);
  }
}

module.exports = UserController;
