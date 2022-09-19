const Service = require('egg').Service;
const { Op } = require('sequelize');
const { pullAll } = require('lodash');
class UserService extends Service {
  async create(role) {
    const result = await this.ctx.model.Role.create(role);
    return result;
  }

  async update(role) {
    const { id, ...data } = role;
    const rows = await this.ctx.model.Role.update(data, {
      where: {
        id,
      },
    });
    return rows;
  }
  async page(data) {
    const { pageSize, current, ...whereData } = data;
    const { count, rows } = await this.ctx.model.Role.findAndCountAll({
      where: whereData,
      limit: Number(pageSize),
      offset: Number(pageSize * (current - 1)),
    });
    return {
      total: count,
      list: rows,
      pageSize,
      current,
    };
  }

  async list(data) {
    const rows = await this.ctx.model.Role.findAll({
      where: data,
    });
    return rows;
  }

  async removeByIds(ids) {
    const { ctx } = this;
    await ctx.model.transaction(async (t) => {
      const roles = await ctx.model.Role.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      });
      await ctx.model.Role.destroy(
        {
          where: {
            id: {
              [Op.in]: ids,
            },
          },
        },
        { transaction: t }
      );

      await ctx.model.UserRole.destroy(
        {
          where: {
            roleId: {
              [Op.in]: ids,
            },
          },
        },
        { transaction: t }
      );
      if (ctx.session.roles) {
        ctx.session.roles = pullAll(
          ctx.session.roles,
          roles.map((role) => role.code)
        );
      }
    });
  }

  async distributionUser(roleIds, userIds) {
    const { ctx } = this;
    await ctx.model.transaction(async (t) => {
      const userList = await ctx.model.User.findAll({
        where: {
          id: {
            [Op.in]: userIds,
          },
        },
      });
      const roleList = await ctx.model.Role.findAll({
        where: {
          id: {
            [Op.in]: roleIds,
          },
        },
      });
      for (const role of roleList) {
        await role.setUsers(userList, {
          transaction: t,
        });
      }
    });
  }

  async distributionResource(roleId, type, resourceIds) {
    const { ctx } = this;
    if (type === 'api') {
      const [role, apiItems] = await Promise.all([
        ctx.model.Role.findByPk(roleId),
        ctx.model.ApiItem.findAll({
          where: {
            id: {
              [Op.in]: resourceIds,
            }
          }
        })
      ]);
      await role.setApiItems(apiItems);
    } else if (type === 'menu') {
      const [role, menus] = await Promise.all([
        ctx.model.Role.findByPk(roleId),
        ctx.model.Menu.findAll({
          where: {
            id: {
              [Op.in]: resourceIds,
            }
          }
        }),
      ]);
      await role.setMenus(menus);
    }
  }
}

module.exports = UserService;
