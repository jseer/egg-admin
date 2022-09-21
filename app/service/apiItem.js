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

    return rows;
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

  getApiItemIdsSql(roleIdsSql) {
    const { ctx } = this;
    return ctx.model.dialect.queryGenerator.selectQuery(
      'role_api_item',
      {
        attributes: ['api_item_id'],
        where: {
          role_id: {
            [Op.in]: ctx.model.literal(`(${roleIdsSql})`),
          },
        },
      },
      ctx.model.RoleApiItem
    ).slice(0, -1);
  }

  async getApiItemsByUserId(id, where) {
    const { ctx } = this;
    const roleIdsSql = ctx.service.role.getRoleIdsSqlByUserId(id);
    const apiItemIdsSql = this.getApiItemIdsSql(roleIdsSql);
    const rows = await ctx.model.ApiItem.findAll({
      attributes: ['path', 'method'],
      where: {
        id: {
          [Op.in]: ctx.model.literal(`(${apiItemIdsSql})`),
        },
        ...where,
      },
    });
    return rows;
  }

  async getApiItemsByRoleList(roleList, where) {
    const { ctx } = this;
    const roleSql = ctx.model.dialect.queryGenerator.selectQuery(
      'role',
      {
        attributes: ['id'],
        where: {
          code: {
            [Op.in]: roleList,
          },
          status: 1,
        },
      },
      ctx.model.Role
    );
    const apiItemIdsSql = this.getApiItemIdsSql(roleSql.slice(0, -1));
    const rows = await ctx.model.ApiItem.findAll({
      attributes: ['path', 'method'],
      where: {
        id: {
          [Op.in]: ctx.model.literal(`(${apiItemIdsSql.slice(0, -1)})`),
        },
        ...where,
      },
    });
    return rows;
  }

  async getApiItemsForCheck(where) {
    const { ctx } = this;
    const rows = await ctx.model.ApiItem.findAll({
      attributes: ['path', 'method'],
      where,
    });
    return rows;
  }

  async getDistributableList() {
    const { ctx } = this;
    const rows = await ctx.model.ApiItem.findAll({
      where: {
        [Op.or]: [
          {
            needLogin: 1,
            needCheck: 1,
          },
          {
            type: '1',
          }
        ]
      },
      raw: true,
    });
    return rows;
  }
}

module.exports = ApiItemService;
