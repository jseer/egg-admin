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

  config.sequelize = {
    host: '127.0.0.1',
    username: 'dev',
    password: '123456',
  };

  config.security = {
    domainWhiteList: ['http://localhost:3000'],
  };

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379, // Redis port
      password: '123456',
    },
  };

  config.rabbitmq = {
    username: 'dev',
    password: '123456',
  };

  return config;
};
