/* eslint valid-jsdoc: "off" */

'use strict';

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
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'admin',
      username: 'root',
      password: '123456',
    },
    security: {
      domainWhiteList: ['*'],
      csrf: false,
    },
    cors: {
      credentials: true,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
