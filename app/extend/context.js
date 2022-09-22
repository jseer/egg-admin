module.exports = {
  success(data, code = 200, message) {
    this.body = {
      code,
      data,
      message,
    };
  },
  fail(message, code = 500) {
    this.body = {
      code,
      message,
    };
  },
};
