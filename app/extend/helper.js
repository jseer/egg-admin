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

  
};
