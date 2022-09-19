'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
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

  async distributionUser() {
    const { ctx } = this;
    const { roleIds, userIds } = ctx.request.body;
    const result = await ctx.service.role.distributionUser(roleIds, userIds);
    ctx.success(result);
  }

  async distributionResource() {
    const { ctx } = this;
    const { id, type, resourceIds } = ctx.request.body;
    const result = await ctx.service.role.distributionResource(id, type, resourceIds);
    ctx.success(result);
  }
}

module.exports = RoleController;
