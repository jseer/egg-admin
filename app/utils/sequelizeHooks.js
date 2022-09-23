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
      if (this.name === 'user') {
        record._options.attributes = {
          exclude: ['password', 'deleteAt'],
        };
      }
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
    beforeFindAfterOptions(options) {
      if (this.name === 'user') {
        if (options.paranoid !== false) {
          options.where.delete_at = {
            [Op.is]: null,
          };
        }
        let len = options.attributes.length;
        const userBlankList = ['password', 'delete_at'];
        for (let i = 0; i < len; i++) {
          const item = options.attributes[i];
          const key = Array.isArray(item) ? item[0] : item;
          if (userBlankList.includes(key)) {
            options.attributes.splice(i, 1);
            len--;
            i--;
          }
        }
      }
    },
    beforeCount(options) {
      if (this.name === 'user' && options.paranoid !== false) {
        options.where.delete_at = {
          [Op.is]: null,
        };
      }
    },
  };
};
