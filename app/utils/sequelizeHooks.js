const dayjs = require('dayjs');
const { Op } = require('sequelize');

module.exports = (appInfo) => {
  return {
    beforeBulkCreate(record, options) {
      options.individualHooks = true;
    },
    beforeCreate(record) {
      const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
      record.dataValues.createTime = date;
      record.dataValues.updateTime = date;
    },
    beforeBulkUpdate(options) {
      options.individualHooks = true;
    },
    beforeUpdate(record) {
      record.dataValues.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
    beforeValidate(record, options) {
      options.skip.push('createTime', 'updateTime');
    },
    beforeFind(options) {
      if (this.name === 'user') {
        if (options.where) {
          options.where.deleteAt = {
            [Op.is]: null,
          };
        } else {
          options.where = {
            deleteAt: {
              [Op.is]: null,
            },
          };
        }
      }
    },
  };
};
