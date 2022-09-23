'use strict';

const Controller = require('egg').Controller;

class ApiItemController extends Controller {
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    if (data.type === '2' && !data.needLogin) {
      data.needCheck = 0;
    }
    const result = await ctx.service.apiItem.create(data);
    ctx.success(result);
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    if (data.type === '2' && !data.needLogin) {
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
    const data = await ctx.service.apiItem.removeByIds(ids);
    if (data) {
      ctx.fail(data.message, data.code);
    } else {
      ctx.success(true);
    }
  }

  async updateStatus() {
    const { ctx } = this;
    await ctx.service.apiItem.updateStatus(ctx.request.body);
    ctx.success(true);
  }

  async updateCheckStatus() {
    const { ctx } = this;
    const { id, type, status } = ctx.request.body;
    const updateData = {};
    if (type === 'needLogin' && status === 0) {
      updateData.needCheck = 0;
    } else if (type === 'needCheck' && status === 1) {
      updateData.needLogin = 1;
    }
    updateData[type] = status;
    await ctx.service.apiItem.updateCheckStatus(id, updateData);
    ctx.success(true);
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
