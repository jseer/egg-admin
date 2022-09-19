/* eslint valid-jsdoc: "off" */

'use strict';
const dayjs = require('dayjs');
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
  config.middleware = ['checkLogin', 'filterData'];

  config.checkLogin = {
    ignore: ['/api/user/login', '/api/user/register'],
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
        hooks: {
          beforeBulkCreate: (record, options) => {
            options.individualHooks = true;
          },
          beforeCreate: (record) => {
            const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
            record.dataValues.createTime = date;
            record.dataValues.updateTime = date;
          },
          beforeBulkUpdate: (options) => {
            options.individualHooks = true;
          },
          beforeUpdate: (record) => {
            record.dataValues.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');;
          },
          beforeValidate: (record, options) => {
            options.skip.push('createTime', 'updateTime');
          },
          beforeSave: (record, options) => {
            debugger
          },
          beforeUpsert: (values, options) => {
            debugger
          }
        },
      },
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
