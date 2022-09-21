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

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_zj-egg-admin';

  // add your middleware config here
  config.middleware = ['checkLogin'];

  config.checkLogin = {
    ignore: ['/api/user/login', '/api/user/register', '/api/tourist/login'],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'admin',
      name: 'root',
      password: '123456',
      define: {
        freezeTableName: false,
        underscored: true,
        hooks: sequelizeHooks(appInfo),
      },
    },
    commonConfig: {
      // superAdmin: 'admin',
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
        },
      }
    },
    security: {
      domainWhiteList: ['http://localhost:3000'],
      csrf: { enable: false },
    },
    cors: {
      credentials: true,
    },
    redis: {
      client: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        db: 0,
        password: '123456',
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
