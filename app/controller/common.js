'use strict';
const Controller = require('egg').Controller;

class CommonController extends Controller {
  async getRsaPublicKey(ctx) {
    ctx.success({
      publicKey: this.app.config.rsaInfo.publicKey,
    });
  }
}

module.exports = CommonController;
