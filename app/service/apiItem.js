const Service = require('egg').Service;
const { Op } = require('sequelize');

class ApiItemService extends Service {
  async create(user) {
    const result = await this.ctx.model.ApiItem.create(user);
    return result;
  }

  async update(user) {
    const { id, ...data } = user;
    const rows = await this.ctx.model.ApiItem.update(data, {
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
    const rows = await ctx.model.ApiItem.findAll({
      where,
      raw: true,
    });
    const result = ctx.helper.loopApiItems(rows);
    return result;
  }

  async removeByIds(ids) {
    const rows = await this.ctx.model.ApiItem.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return rows;
  }

  async listByRoleId(roleId) {
    const { ctx } = this;
    const rows = await ctx.model.ApiItem.findAll({
      where: {
        id: {
          [Op.in]: ctx.model.literal(`
            (SELECT api_item_id FROM role_api_item WHERE role_id=${roleId})
          `),
        },
      },
    });
    return rows;
  }
}

module.exports = ApiItemService;
