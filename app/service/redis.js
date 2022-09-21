const Service = require('egg').Service;

class RedisService extends Service {
  constructor(ctx) {
    super(ctx);
    this.redisPrefixKey = 'egg-admin';
    this.separator = ':';
  }

  generateKey(key) {
    return this.redisPrefixKey + this.separator + key;
  }

  async pullApiItemsToRedis(key, where) {
    const result = await this.ctx.service.apiItem.getApiItemsForCheck(where);
    await this.ctx.app.redis.set(this.generateKey(key), JSON.stringify(result));
    return result;
  }

  async getDataByKey(key) {
    const result = await this.ctx.app.redis.get(this.generateKey(key));
    return JSON.parse(result);
  }
}

module.exports = RedisService;
