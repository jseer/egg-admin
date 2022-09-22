const Transport = require('egg-logger').Transport;
class RemoteTransport extends Transport {
  constructor(options) {
    super(options);
    this.contents = [];
    this._timer = this._createInterval();
  }

  get defaults() {
    return Object.assign(super.defaults, {
      flushInterval: 1000,
      maxContentsLength: 1000,
      level: 'INFO',
    });
  }

  log(level, args, meta) {
    const str = super.log(level, args, meta);
    this.contents.push(str);
    if (this.contents.length >= this.options.maxBufferLength) {
      this.flush();
    }
  }

  close() {
    this._closeInterval();
    this.flush();
  }

  flush() {
    if (this.contents.length > 0) {
      // TODO:
      this.contents = [];
    }
  }

  _createInterval() {
    return setInterval(() => this.flush(), this.options.flushInterval);
  }

  _closeInterval() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }
}

module.exports = RemoteTransport;
