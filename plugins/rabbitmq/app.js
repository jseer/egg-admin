const Rabbitmq = require('./lib/loader');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    this.app.rabbitmq = new Rabbitmq(this.app);
    await this.app.rabbitmq.connect();
  }
}

module.exports = AppBootHook;
