class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    const {
      commonConfig: { apiItemsConf },
    } = this.app.config;
    const ctx = await this.app.createAnonymousContext();
    if (!(await ctx.service.redis.exist(apiItemsConf.redisKey))) {
      await ctx.service.apiItem.pullGivenApiItemsToRedis();
    }
  }
}

module.exports = AppBootHook;
