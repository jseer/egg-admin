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
      if (this.options.custom_paranoid) {
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
            const temp = options.attributes[i];
            options.attributes[i] = options.attributes[len - 1];
            options.attributes[len - 1] = temp;
            len--;
            i--;
          }
        }
        options.attributes.splice(len);
      }
    },
    beforeCount(options) {
      if (this.options.custom_paranoid && options.paranoid !== false) {
        if (options.where) {
          options.where.delete_at = {
            [Op.is]: null,
          };
        } else {
          options.where = {
            delete_at: {
              [Op.is]: null,
            },
          };
        }
      }
    },
  };
};
