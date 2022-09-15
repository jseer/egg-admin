const Service = require('egg').Service;
const { Op } = require('sequelize');

class MenuService extends Service {
  async create(user) {
    const result = await this.ctx.model.Menu.create(user);
    return result;
  }

  async update(user) {
    const { id, ...data } = user;
    const rows = await this.ctx.model.Menu.update(data, {
      where: {
        id,
      },
    });
    return rows;
  }
  async list(data) {
    const { ctx } = this;
    const rows = await ctx.model.Menu.findAll({
      where: data,
      raw: true,
    });
    const result = ctx.helper.loopMenu(rows);
    return result;
  }

  async removeByIds(ids) {
    const rows = await this.ctx.model.Menu.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return rows;
  }
}

module.exports = MenuService;
