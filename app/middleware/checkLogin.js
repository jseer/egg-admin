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
      commonConfig: { disabledApiItemsConf, needCheckApiItemsConf },
    } = ctx.app.config;
    let disabledApiItems = await ctx.service.redis.getDataByKey(
      disabledApiItemsConf.redisKey
    );
    if (!disabledApiItems) {
      disabledApiItems = await ctx.service.redis.pullApiItemsToRedis(
        disabledApiItemsConf.redisKey,
        disabledApiItemsConf.params
      );
    }
    const path = ctx.path;
    const method = ctx.method;
    if (filterApi(disabledApiItems, path, method)) {
      ctx.throw(403);
      return;
    }

    const user = ctx.session.user;
    if (user) {
      let needCheckApiItems = await ctx.service.redis.getDataByKey(
        needCheckApiItemsConf.redisKey
      );
      if (!needCheckApiItems) {
        needCheckApiItems = await ctx.service.redis.pullApiItemsToRedis(
          needCheckApiItemsConf.redisKey,
          needCheckApiItemsConf.params
        );
      }
      if (filterApi(needCheckApiItems, path, method)) {
        const { commonConfig } = ctx.app.config;
        let apiItems = null;
        if (user.type === USER_TYPE.ACCOUNT) {
          apiItems = await ctx.service.apiItem.getApiItemsByUserId(
            user.id,
            needCheckApiItemsConf.params
          );
        } else if (user.type === USER_TYPE.TOURIST) {
          apiItems = await ctx.service.apiItem.getApiItemsByRoleList(
            commonConfig.touristRoles,
            where
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
      ctx.fail('未登录', 401);
    }
  };
};
