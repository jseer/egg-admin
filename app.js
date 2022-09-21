class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    const {
      commonConfig: { disabledApiItemsConf, needCheckApiItemsConf },
    } = this.app.config;
    const ctx = await this.app.createAnonymousContext();
    const disabledApiItems = await ctx.service.redis.getDataByKey(
      disabledApiItemsConf.redisKey
    );
    const needCheckApiItems = await ctx.service.redis.getDataByKey(
      needCheckApiItemsConf.redisKey
    );
    const promiseArr = [];
    if (!disabledApiItems) {
      promiseArr.push(
        ctx.service.redis.pullApiItemsToRedis(
          disabledApiItemsConf.redisKey,
          disabledApiItemsConf.params
        )
      );
    }
    if (!needCheckApiItems) {
      promiseArr.push(
        ctx.service.redis.pullApiItemsToRedis(
          needCheckApiItemsConf.redisKey,
          needCheckApiItemsConf.params
        )
      );
    }
    await Promise.all(promiseArr);
  }
}

module.exports = AppBootHook;
