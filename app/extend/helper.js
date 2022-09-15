module.exports = {
  loopMenu(menus) {
    const records = {};
    const result = [];
    menus.forEach((menu) => {
      if (menu.parentId) {
        if (records[menu.parentId]) {
          records[menu.parentId].push(menu);
        } else {
          records[menu.parentId] = [menu];
        }
      } else {
        result.push(menu);
        menu.children = records[menu.id] ? records[menu.id] : (records[menu.id] = []);
      }
    })
    return result;
  }
}