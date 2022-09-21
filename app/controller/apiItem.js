'use strict';

const Controller = require('egg').Controller;

class ApiItemController extends Controller {
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    if (!data.needLogin) {
      data.needCheck = 0;
    }
    const result = await ctx.service.apiItem.create(data);
    ctx.success(result);
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    if (!data.needLogin) {
      data.needCheck = 0;
    }
    await ctx.service.apiItem.update(data);
    ctx.success(true);
  }

  async list() {
    const { ctx } = this;
    const data = await ctx.service.apiItem.list(ctx.helper.query2where(ctx.query));
    const result = ctx.helper.loopApiItems(data);
    ctx.success(result);
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

  async getDistributableList() {
    const { ctx } = this;
    const data = await ctx.service.apiItem.getDistributableList();
    const result = ctx.helper.loopApiItems(data);
    ctx.success(result);
  }
}

module.exports = ApiItemController;
