const Service = require('egg').Service;
const { Op, QueryTypes } = require('sequelize');

class MenuService extends Service {
  async create(user) {
    const result = await this.ctx.model.Menu.create(user);
    return result;
  }

  async update(user) {
    const { id, status, ...data } = user;
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

  async recursionDestroy(ids) {
    const { ctx } = this;
    const deleteIds = await ctx.model.query(
      `
          SELECT
            id
          FROM
            menu AS a 
          WHERE
            id IN (:ids) 
            AND NOT EXISTS (
            SELECT
              id 
            FROM
              menu AS b 
            WHERE
            parent_id = a.id 
            );
    `,
      {
        model: ctx.model.Menu,
        mapToModel: true,
        type: QueryTypes.SELECT,
        replacements: { ids },
      }
    );
    let rows = 0;
    if (deleteIds.length > 0) {
      rows = await ctx.model.Menu.destroy({
        where: {
          id: {
            [Op.in]: deleteIds.map((d) => d.id),
          },
        },
      });
    }

    const list = await ctx.model.Menu.findAll({
      where: {
        [Op.and]: [
          {
            id: {
              [Op.in]: ids,
            },
          },
        ],
      },
    });
    if (rows && list.length) {
      const newIds = list.map((l) => l.id);
      return this.recursionDestroy(newIds);
    }
    return list;
  }

  async removeByIds(ids) {
    const restList = await this.recursionDestroy(ids);
    if (restList.length > 0) {
      return {
        code: 500,
        message: `删除子项，${restList.map((l) => l.name).join(',')}才能删除`,
      };
    }
  }

  async recursionFindIdsById(ids, idArr) {
    const { ctx } = this;
    const children = await ctx.model.Menu.findAll({
      where: {
        parentId: ids,
      },
    });
    const childIds = children.map((c) => c.id);
    idArr.push.apply(idArr, childIds);
    if (childIds.length) {
      await this.recursionFindIdsById(childIds, idArr);
    }
  }

  async updateStatus(data) {
    const { ctx } = this;
    const { id, status } = data;
    const idArr = [id];
    await this.recursionFindIdsById([id], idArr);
    await ctx.model.Menu.update(
      { status },
      {
        where: {
          id: idArr,
        },
      }
    );
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

  async authListByTouristRoles(roles) {
    const { ctx } = this;
    const rows = await ctx.model.Menu.findAll({
      where: {
        status: 1,
        id: {
          [Op.in]: ctx.model.literal(
            `(${this.getMenuIdsSqlByRoleIdsSql(
              ctx.service.role.getRoleIdsSqlByRoleCodes(roles)
            )})`
          ),
        },
      },
      raw: true,
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
