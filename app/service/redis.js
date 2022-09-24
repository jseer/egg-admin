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

  async exist(key) {
    return this.app.redis.exists(this.generateKey(key));
  }

  async hgetall(key) {
    const result = await this.app.redis.hgetall(this.generateKey(key));
    if (result) {
      Object.keys(result).forEach((k) => {
        result[k] = JSON.parse(result[k]);
      });
      return result;
    }
    return null;
  }

  async hmset(key, ...arg) {
    await this.app.redis.hmset(this.generateKey(key), ...arg);
  }
}

module.exports = RedisService;
