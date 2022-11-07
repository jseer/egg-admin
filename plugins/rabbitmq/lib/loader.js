const amqplib = require('amqplib');

module.exports = class Rabbitmq {
  constructor(app) {
    this.options = app.config.rabbitmq;
    this.logger = app.logger;
    this.conn = null;
  }

  async retryConnect() {
    this.logger.info('[rabbitmq] retry connect...');
    try {
      if (!this.conn) {
        await this.connect();
      }
    } catch (err) {
      this.logger.error('[rabbitmq] retryConnect error', err);
      setTimeout(async () => {
        await this.retryConnect();
      }, 3000);
    }
  }

  async connect() {
    this.logger.info('[rabbitmq] connect...');
    this.conn = await amqplib.connect(this.options);
    this.logger.info('[rabbitmq] connected');
    this.conn.on('error', (err) => {
      this.logger.info('[rabbitmq] error %o', err);
    });
    this.conn.on('close', () => {
      this.logger.info('[rabbitmq] close');
      this.conn = null;
      this.retryConnect();
    });

    this.conn.on('blocked', (reason) => {
      this.logger.info('[rabbitmq] blocked: %o ', reason);
    });
    this.conn.on('unblocked', () => {
      this.logger.info('[rabbitmq] unblocked');
    });

    process.once('exit', () => {
      this.conn.close();
    });
  }

  async createConfirmChannel() {
    const channel = await this.conn.createConfirmChannel();
    channel.on('close', () => () => {
      this.logger.info('[rabbitmq channel %s] close');
    });
    channel.on('error', (error) => () => {
      this.logger.info('[rabbitmq channel] error %o', error);
    });
    channel.on('return', (msg) => () => {
      this.logger.info('[rabbitmq channel] return %o', msg);
    });
    channel.on('drain', () => {
      this.logger.info('[rabbitmq channel] drain');
    });
    return channel;
  }

  async createChannel() {
    const channel = await this.conn.createChannel();
    channel.on('close', () => () => {
      this.logger.info('[rabbitmq channel] close');
    });
    channel.on('error', (error) => () => {
      this.logger.info('[rabbitmq channel] error %o', error);
    });
    return channel;
  }
};
