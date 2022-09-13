'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  onerror: {
    enable: true,
    package: 'egg-onerror',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
