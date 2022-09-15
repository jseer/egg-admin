'use strict';

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
    const data = await ctx.service.menu.page(ctx.query);
    ctx.success(data);
  }

  async list() {
    const { ctx } = this;
    const data = await ctx.service.menu.list(ctx.query);
    ctx.success(data);
  }

  async removeByIds() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    const result = await ctx.service.menu.removeByIds(ids);
    ctx.success(result);
  }
}

module.exports = MenuController;
