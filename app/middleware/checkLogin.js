module.exports = function checkLogin(options) {
  return async (ctx, next) => {
    if(ctx.session.user) {
      await next();
    } else {
      ctx.fail('未登录', 401);
    }
  }
}