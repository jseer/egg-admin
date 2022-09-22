'use strict';
const Controller = require('egg').Controller;

class SystemController extends Controller {
  async getLoginRecords() {
    const { ctx } = this;
    const result = await ctx.service.user.getLoginRecords(
      ctx.helper.query2where(ctx.query)
    );
    ctx.success(result);
  }
}

module.exports = SystemController;
