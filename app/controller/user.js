'use strict';

const Controller = require('egg').Controller;
const { result } = require('lodash');
const { Op } = require('sequelize');

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
      ctx.session.user = data;
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

  async list() {
    const { ctx } = this;
    const data = await ctx.service.user.list(ctx.query);
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
    // const { id } = ctx.session.user;
    // const userInfo = await ctx.service.user.findById(id);
    if (ctx.session.user) {
      ctx.success(ctx.session.user);
    } else {
      ctx.fail(401, '未登录');
    }
  }

  async getListByRoleId() {
    const { ctx } = this;
    const { id } = ctx.query;
    const result = await ctx.service.user.getListByRoleId(id);
    ctx.success(result);
  }
}

module.exports = UserController;
