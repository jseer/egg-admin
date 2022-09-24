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

  config.sequelize = {
    host: '127.0.0.1'
  };

  config.security = {
    domainWhiteList: ['http://localhost:3000'],
  };

  config.redis = {
    client: {
      host: '127.0.0.1',
    },
  };
  return config;
};