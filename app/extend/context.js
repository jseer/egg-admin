module.exports = {
  success(data, code = 200) {
    this.body = {
      code,
      data,
    };
  },
  fail(message, code = 500) {
    this.body = {
      code,
      message,
    }
  }
}