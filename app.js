const RemoteLogger = require('./app/utils/remoteLogger');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    const {
      commonConfig: { disabledApiItemsConf, needCheckApiItemsConf },
    } = this.app.config;
    const ctx = await this.app.createAnonymousContext();
    this.app.getLogger('logger').set(
      'remote',
      new RemoteLogger({ app: this.app })
    );
    const disabledApiItems = await ctx.service.redis.getDataByKey(
      disabledApiItemsConf.redisKey
    );
    const needCheckApiItems = await ctx.service.redis.getDataByKey(
      needCheckApiItemsConf.redisKey
    );
    if (!(disabledApiItems && needCheckApiItems)) {
      await ctx.service.apiItems.pullCommonApiItemsToRedis();
    }
  }
}

module.exports = AppBootHook;
