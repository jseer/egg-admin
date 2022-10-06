const { USER_TYPE } = require('../utils/common');

module.exports = function checkLogin() {
  const filterApi = (apiItems, path, method) => {
    return (
      apiItems &&
      apiItems.some(
        (api) => api.path === path && api.method?.toUpperCase() === method
      )
    );
  };
  return async (ctx, next) => {
    /*
    ctx.session.user
    */
    const {
      commonConfig: { superAdmin, apiItemsConf },
    } = ctx.app.config;

    const user = ctx.session.user;
    if (user?.name === superAdmin) {
      return next();
    }

    let givenApiItems = await ctx.service.redis.hgetall(apiItemsConf.redisKey);
    if (!givenApiItems.disabled) {
      givenApiItems = await ctx.service.apiItem.pullGivenApiItemsToRedis();
    }
    const path = ctx.path;
    const method = ctx.method;
    if (filterApi(givenApiItems.disabled, path, method)) {
      ctx.fail('管理员禁用了该功能', 403);
      return;
    }

    if (user) {
      if (filterApi(givenApiItems.needLoginCheck, path, method)) {
        const { commonConfig } = ctx.app.config;
        let apiItems = null;
        if (user.type === USER_TYPE.ACCOUNT) {
          apiItems = await ctx.service.apiItem.getApiItemsByUserId(
            user.id,
            apiItemsConf.needLoginCheck
          );
        } else if (user.type === USER_TYPE.TOURIST) {
          apiItems = await ctx.service.apiItem.getApiItemsByRoleList(
            commonConfig.touristRoles,
            apiItemsConf.needLoginCheck
          );
        }
        if (filterApi(apiItems, path, method)) {
          return next();
        }
        ctx.throw(403);
      } else {
        return next();
      }
    } else {
      if (filterApi(givenApiItems.notNeedLogin, path, method)) {
        return next();
      }
      ctx.fail('未登录', 401);
    }
  };
};
