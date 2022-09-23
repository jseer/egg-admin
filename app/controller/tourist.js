'use strict';
const parser = require('ua-parser-js');
const Controller = require('egg').Controller;

class TouristController extends Controller {
  async login() {
    const { ctx, app } = this;
    const ua = parser(ctx.headers['user-agent']);
    const browser = ua.browser.name + '/' + ua.browser.version;
    //TODO:
    const data = ctx.helper.ip2Locate('58.248.12.198' || ctx.ip);
    const result = await ctx.service.tourist.create({
      ...data,
      browser,
    });
    ctx.session.user = result;
    const { commonConfig: { defaultLoginMaxAge } } = app.config;
    ctx.session.maxAge = defaultLoginMaxAge;
    ctx.success(result);
  }

  async page() {
    const { ctx } = this;
    const result = await ctx.service.tourist.page(ctx.helper.query2where(ctx.query));
    ctx.success(result);
  }
}

module.exports = TouristController;
