const RemoteLogger = require('./app/utils/remoteLogger');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    const {
      commonConfig: { disabledApiItemsConf, needCheckApiItemsConf, notNeedLoginApiItemsConf },
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

    const notNeedLoginApiItems = await ctx.service.redis.getDataByKey(
      notNeedLoginApiItemsConf.redisKey
    );
    if (!(disabledApiItems && needCheckApiItems && notNeedLoginApiItems)) {
      await ctx.service.apiItem.pullCommonApiItemsToRedis();
    }
  }
}

module.exports = AppBootHook;
