const Service = require('egg').Service;
const { Op, QueryTypes } = require('sequelize');

class ApiItemService extends Service {
  async create(user) {
    const { ctx } = this;
    return await ctx.model.transaction(async (t) => {
      const data = await this.ctx.model.ApiItem.create(user, {
        transaction: t,
      });
      await this.pullCommonApiItemsToRedis();
      return data;
    });
  }

  async update(user) {
    const { ctx } = this;
    const { id, status, needCheck, needLogin, ...data } = user;
    return await ctx.model.transaction(async (t) => {
      const rows = await this.ctx.model.ApiItem.update(
        data,
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );
      await this.pullCommonApiItemsToRedis();
      return rows;
    });
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

  async recursionDestroy(ids, t) {
    const { ctx } = this;
    const deleteIds = await ctx.model.query(
      `
          SELECT
            id
          FROM
            api_items AS a 
          WHERE
            id IN (:ids) 
            AND NOT EXISTS (
            SELECT
              id 
            FROM
              api_items AS b 
            WHERE
            parent_id = a.id 
            );
    `,
      {
        model: ctx.model.ApiItem,
        mapToModel: true,
        type: QueryTypes.SELECT,
        replacements: { ids },
      }
    );
    let rows = 0;
    if (deleteIds.length > 0) {
      rows = await ctx.model.ApiItem.destroy(
        {
          where: {
            id: {
              [Op.in]: deleteIds.map((d) => d.id),
            },
          },
        },
        { transaction: t }
      );
    }

    const list = await ctx.model.ApiItem.findAll({
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
      return this.recursionDestroy(newIds, t);
    }
    return list;
  }

  async removeByIds(ids) {
    const { ctx } = this;
    return ctx.model.transaction(async (t) => {
      const restList = await this.recursionDestroy(ids, t);
      if (restList.length > 0) {
        return {
          code: 500,
          message: `删除子项，${restList.map((l) => l.name).join(',')}才能删除`,
        };
      }
      await this.pullCommonApiItemsToRedis();
    });
  }

  async recursionFindIdsById(ids, idArr) {
    const { ctx } = this;
    const children = await ctx.model.ApiItem.findAll({
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
    await ctx.model.ApiItem.update(
      { status },
      {
        where: {
          id: idArr,
        },
      }
    );
  }

  async updateCheckStatus(id, data) {
    const { ctx } = this;
    await ctx.model.ApiItem.update(
      data,
      {
        where: {
          id,
        },
      }
    );
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
    return ctx.model.dialect.queryGenerator
      .selectQuery(
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
      )
      .slice(0, -1);
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
          [Op.in]: ctx.model.literal(`(${apiItemIdsSql})`),
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
          },
        ],
      },
      raw: true,
    });
    return rows;
  }

  async pullCommonApiItemsToRedis() {
    const { ctx, app } = this;
    const {
      commonConfig: { disabledApiItemsConf, needCheckApiItemsConf },
    } = app.config;
    await Promise.all([
      ctx.service.redis.pullApiItemsToRedis(
        disabledApiItemsConf.redisKey,
        disabledApiItemsConf.params
      ),
      ctx.service.redis.pullApiItemsToRedis(
        needCheckApiItemsConf.redisKey,
        needCheckApiItemsConf.params
      ),
    ]);
  }
}

module.exports = ApiItemService;
