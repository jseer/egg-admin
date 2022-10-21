const { USER_TYPE } = require('../utils/common');

module.exports = function checkLogin() {
  return async (ctx, next) => {
    const {
      commonConfig: { superAdmin },
    } = ctx.app.config;

    let user = ctx.session.user;

    if (ctx.headers['x-super-user'] === superAdmin) {
      if (ctx.path === '/api/user/logout') {
        ctx.session = null;
        return ctx.success(true);
      }
      if (!user) {
        user = { id: 0, name: superAdmin, type: USER_TYPE.ACCOUNT };
        ctx.session.user = user;
      }
      return ctx.success(user);
    }
    return next();
  };
};
