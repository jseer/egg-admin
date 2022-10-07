/* eslint valid-jsdoc: "off" */

'use strict';
const sequelizeHooks = require('../app/utils/sequelizeHooks');
const fs = require('fs');
const path = require('path');
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
    ignore: ['/api/user/login', '/api/common/rsa/public'],
  };

  config.sequelize = {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: 'admin',
    username: 'admin_egg-admin',
    password: process.env.MYSQL_ADMIN_PASSWORD,
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
    apiItemsConf: {
      redisKey: 'apiItems',
      disabled: {
        status: 0,
        type: '2',
      },
      needLoginCheck: {
        status: 1,
        needLogin: 1,
        needLoginCheck: 1,
        type: '2',
      },
      notNeedLogin: {
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
      port: process.env.REDIS_PORT, // Redis port
      host: process.env.REDIS_HOST,
      db: 0,
      password: process.env.REDIS_PASSWORD,
    },
  };

  config.logger = {
    disableConsoleAfterReady: false,
  };

  config.rsaInfo = {
    publicKey: fs.readFileSync(
      path.resolve(__dirname, '../app/utils/rsa/rsa_1024_pub.pem'),
      'utf-8'
    ),
    privateKey: fs.readFileSync(
      path.resolve(__dirname, '../app/utils/rsa/rsa_1024_priv.pem'),
      'utf-8'
    ),
  };

  return config;
};
