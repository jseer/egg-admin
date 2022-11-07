const Service = require('egg').Service;
const fs = require('fs/promises');
const path = require('path');
const { INIT_DATA_CONFIG } = require('../utils/common');

class SystemService extends Service {
  async initData() {
    const { ctx, config, app } = this;
    const sql = await fs.readFile(
      path.join(config.baseDir, 'sql/egg_admin.sql'),
      'utf-8'
    );
    if (await ctx.service.redis.exist(INIT_DATA_CONFIG.redis_key)) {
      const c = await app.rabbitmq.createChannel();
      await c.assertExchange(INIT_DATA_CONFIG.mq.exchange, 'fanout', {
        durable: false,
      });
      const q = c.assertQueue('', {
        exclusive: false,
      });
      await c.bindQueue(q.queue, INIT_DATA_CONFIG.mq.exchange, '');
      return new Promise((resolve, reject) => {
        c.consume(
          q.queue,
          async (msg) => {
            const message = msg.content.toString();
            ctx.logger.info('[rabbitmq receive message] %o', {
              exchange: INIT_DATA_CONFIG.mq.exchange,
              queue: q.queue,
              message,
            });
            if (message === 'fail') {
              reject(new Error('初始化失败'));
            } else {
              resolve();
            }
          },
          { noAck: true }
        );
      });
    }

    let message = '';
    const channel = await app.rabbitmq.createConfirmChannel();
    try {
      await channel.assertExchange(INIT_DATA_CONFIG.mq.exchange, 'fanout', {
        durable: false,
      });
      await ctx.service.redis.set(INIT_DATA_CONFIG.redis_key, 1);
      await ctx.model.query(sql);
      await ctx.service.redis.del(INIT_DATA_CONFIG.redis_key);
      message = 'ok';
      await channel.publish(
        INIT_DATA_CONFIG.mq.exchange,
        '',
        Buffer.from(message)
      );
      ctx.logger.info('[rabbitmq publish message] %o', {
        exchange: INIT_DATA_CONFIG.mq.exchange,
        message,
      });
    } catch (e) {
      const message = 'fail';
      await channel.publish(
        INIT_DATA_CONFIG.mq.exchange,
        '',
        Buffer.from(message)
      );
      ctx.logger.info('[rabbitmq publish message] %o', {
        exchange: INIT_DATA_CONFIG.mq.exchange,
        message,
      });
      throw e;
    }
  }
}

module.exports = SystemService;
