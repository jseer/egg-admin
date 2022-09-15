module.exports = function checkLogin() {
  return async (ctx, next) => {
    if (ctx.session) {
      await next();
    } else {
      ctx.fail('未登录', 401);
    }
  };
};
