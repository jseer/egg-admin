const handleError = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e);
      ctx.fail(e.message, 500);
    }
  }
}

module.exports = handleError;