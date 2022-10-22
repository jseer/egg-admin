class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    this.app.messenger.once('init-redis-apiItems', async () => {
      this.app.logger.info('[app receiveMessage] %s', 'init-redis-apiItems');
      const {
        commonConfig: { apiItemsConf },
      } = this.app.config;
      const ctx = await this.app.createAnonymousContext();
      if (!(await ctx.service.redis.exist(apiItemsConf.redisKey))) {
        await ctx.service.apiItem.pullGivenApiItemsToRedis();
      }
    });
  }
}

module.exports = AppBootHook;
