const path = require('path');
const ipdb = require('ipip-ipdb');
const { Op } = require('sequelize');
const ipDatabaseUri = path.resolve(__dirname, '../../assets/ipipfree.ipdb');

const DatabaseClient = new ipdb.City(ipDatabaseUri);

module.exports = {
  loopMenus(menus) {
    const records = {};
    const result = [];
    menus.forEach((menu) => {
      if (menu.parentId) {
        if (records[menu.parentId]) {
          this.insertItem(records[menu.parentId], menu);
        } else {
          records[menu.parentId] = [menu];
        }
      } else {
        this.insertItem(result, menu);
      }
      if (menu.type == '1') {
        menu.children = records[menu.id]
          ? records[menu.id]
          : (records[menu.id] = []);
      }
    });
    return result;
  },
  loopApiItems(apiItems) {
    const records = {};
    const result = [];
    apiItems.forEach((apiItem) => {
      if (apiItem.parentId) {
        if (records[apiItem.parentId]) {
          records[apiItem.parentId].push(apiItem);
        } else {
          records[apiItem.parentId] = [apiItem];
        }
      } else {
        result.push(apiItem);
      }
      if (apiItem.type == '1') {
        apiItem.children = records[apiItem.id]
          ? records[apiItem.id]
          : (records[apiItem.id] = []);
      }
    });
    return result;
  },

  insertItem(list, item) {
    let i = list.length;
    let j = i;
    while (i--) {
      const one = list[i];
      if (one.sort >= item.sort) {
        break;
      } else {
        list[j] = one;
        j--;
      }
    }
    list[j] = item;
  },

  isIp(ip) {
    return /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|$)){4}$/.test(ip);
  },

  ip2Locate(ip) {
    if (this.isIp(ip) === false) {
      return null;
    }
    const res = DatabaseClient.findInfo(ip, 'CN');
    return {
      country: res.countryName, //  国家
      province: res.regionName, //  省
      city: res.cityName, //  市
    };
  },

  query2where(query) {
    const whereQuery = {};
    Object.keys(query).forEach((k) => {
      const value = query[k];
      if (value == null || value === '') return;
      const [prefix, key, operation] = k.split('-');
      if (prefix && key && operation) {
        switch (operation) {
          case 'eq':
            whereQuery[key] = {
              [Op.eq]: value,
            };
            break;
          case 'like':
            whereQuery[key] = {
              [Op.like]: `%${value}%`,
            };
            break;
          case 'in':
          whereQuery[key] = {
            [Op.in]: value.split(','),
          };
          break;
          default:
            whereQuery[key] = value;
            break;
        }
      } else {
        whereQuery[k] = query[k];
      }
    });
    return whereQuery;
  },
};
