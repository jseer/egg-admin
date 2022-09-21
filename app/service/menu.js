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
      };
    }
    if (where.name) {
      where.name = {
        [Op.like]: `%${where.name}%`,
      };
    }
    const rows = await ctx.model.Menu.findAll({
      where,
      raw: true,
    });
    return rows;
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

  async authListByAccountUserId(userId) {
    const { ctx } = this;
    const rows = await ctx.model.Menu.findAll({
      where: {
        status: 1,
        id: {
          [Op.in]: ctx.model.literal(
            `(${this.getMenuIdsSqlByRoleIdsSql(
              ctx.service.role.getRoleIdsSqlByUserId(userId)
            )})`
          ),
        },
      },
      raw: true,
    });
    return rows;
  }

  async authListByAccountTourist(ids) {
    const rows = await this.ctx.model.Menu.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return rows;
  }

  getMenuIdsSqlByRoleIdsSql(roleIdsSql) {
    const { ctx } = this;
    return this.ctx.model.dialect.queryGenerator
      .selectQuery('role_menu', {
        attributes: ['menu_id'],
        where: {
          role_id: {
            [Op.in]: ctx.model.literal(`(${roleIdsSql})`),
          },
        },
      })
      .slice(0, -1);
  }
}

module.exports = MenuService;
