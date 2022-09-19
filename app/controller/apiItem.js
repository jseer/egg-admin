'use strict';

const Controller = require('egg').Controller;

class ApiItemController extends Controller {
  async create() {
    const { ctx } = this;
    const data = await ctx.service.apiItem.create(ctx.request.body);
    ctx.success(data);
  }

  async update() {
    const { ctx } = this;
    await ctx.service.apiItem.update(ctx.request.body);
    ctx.success(true);
  }

  async list() {
    const { ctx } = this;
    const data = await ctx.service.apiItem.list(ctx.query);
    ctx.success(data);
  }

  async removeByIds() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    const result = await ctx.service.apiItem.removeByIds(ids);
    ctx.success(result);
  }

  async listByRoleId() {
    const { ctx } = this;
    const data = await ctx.service.apiItem.listByRoleId(ctx.query.id);
    ctx.success(data);
  }
}

module.exports = ApiItemController;
