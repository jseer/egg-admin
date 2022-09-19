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
    const where = data;
    if (where.code) {
      where.code = {
        [Op.like]: `%${where.code}%`,
      }
    }
    if (where.name) {
      where.name = {
        [Op.like]: `%${where.name}%`,
      }
    }
    const rows = await ctx.model.Menu.findAll({
      where,
      raw: true,
    });
    const result = ctx.helper.loopMenus(rows);
    return result;
  }

  async listByRoleId(roleId) {
    const { ctx } = this;
    const rows = await ctx.model.Menu.findAll({
      where: {
        id: {
          [Op.in]: ctx.model.literal(`
            (SELECT menu_id FROM role_menu WHERE role_id=${roleId})
          `),
        },
      },
    });
    return rows;
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
