/* eslint valid-jsdoc: "off" */

'use strict';
const sequelizeHooks = require('../app/utils/sequelizeHooks');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.keys = appInfo.name + '_zj-egg-admin';

  config.middleware = ['checkLogin'];

  config.checkLogin = {
    ignore: ['/api/user/login'],
  };

  config.sequelize = {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: 3306,
    database: 'admin',
    name: 'root',
    password: 'rootrootroot123456',
    define: {
      freezeTableName: false,
      underscored: true,
      hooks: sequelizeHooks(appInfo),
    },
  };

  config.commonConfig = {
    superAdmin: 'root',
    touristRoles: ['tourist'],
    accountRoles: ['normal_user'],
    disabledApiItemsConf: {
      redisKey: 'disabledApiItems',
      params: {
        status: 0,
        type: '2',
      },
    },
    needCheckApiItemsConf: {
      redisKey: 'needCheckApiItems',
      params: {
        status: 1,
        needLogin: 1,
        needCheck: 1,
        type: '2',
      },
    },
    notNeedLoginApiItemsConf: {
      redisKey: 'notNeedLoginApiItems',
      params: {
        status: 1,
        needLogin: 0,
        type: '2',
      },
    },
    defaultLoginMaxAge: 3600000,
  };

  config.security = {
    csrf: { enable: false },
  };

  config.cors = {
    credentials: true,
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: process.env.REDIS_HOST,
      db: 0,
      password: '123456',
    },
  };
  return config;
};
