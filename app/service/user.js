const Service = require('egg').Service;
const { Op } = require('sequelize');
const dayjs = require('dayjs');

class UserService extends Service {
  async create(user) {
    const result = await this.ctx.model.User.create(user);
    return result;
  }

  async register(user) {
    const { ctx } = this;
    const result = await ctx.model.transaction(async (t) => {
      const result = await ctx.model.User.create(user, {
        transaction: t,
      });
      const {
        commonConfig: { accountRoles },
      } = this.app.config;
      const roles = await ctx.model.Role.findAll({
        attributes: ['id'],
        where: {
          code: {
            [Op.in]: accountRoles,
          },
        },
      });
      const records = roles.map((role) => ({
        userId: result.id,
        roleId: role.id,
      }));
      await ctx.model.UserRole.bulkCreate(records, {
        transaction: t,
      });
    });
    return result;
  }

  async login(user) {
    const { ctx } = this;
    const result = await ctx.model.User.findOne({
      where: {
        name: user.name,
        password: user.password,
      },
      attributes: {
        exclude: ['password'],
      },
    });
    //TODO:
    const info = ctx.helper.ip2Locate('58.248.12.198' || ctx.ip);
    await ctx.model.LoginRecords.create({
      name: result.name,
      userId: result.id,
      loginTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      type: result.type,
      ...info,
    });
    return result;
  }

  async update(user) {
    const { password, deleteAt, id, ...data } = user;
    await this.ctx.model.User.update(data, {
      where: {
        id,
      },
    });
  }
  async page(data) {
    const { pageSize, current, roles, ...whereData } = data;

    const { count, rows } = await this.ctx.model.User.findAndCountAll({
      where: whereData,
      limit: Number(pageSize),
      offset: Number(pageSize * (current - 1)),
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: this.ctx.model.Role,
        where: roles
          ? {
              roles,
            }
          : undefined,
        through: {
          attributes: [],
        },
      },
    });
    return {
      total: count,
      list: rows,
      pageSize,
      current,
    };
  }

  async list(data) {
    const rows = await this.ctx.model.User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return rows;
  }

  async removeByIds(ids) {
    // const rows = await this.ctx.model.User.destroy({
    //   where: {
    //     id: {
    //       [Op.in]: ids,
    //     },
    //   },
    // });
    const deleteAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    await this.ctx.model.User.update(
      {
        deleteAt,
      },
      {
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      }
    );
  }

  async findById(id) {
    const rows = await this.ctx.model.User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    return rows;
  }

  async getListByRoleId(id) {
    const { ctx } = this;
    const rows = await ctx.model.User.findAll({
      where: {
        id: {
          [Op.in]: ctx.model.literal(`(
            SELECT user_id
            FROM user_role as userRole
            WHERE
            userRole.role_id = ${id}
        )`),
        },
      },
      attributes: {
        exclude: ['password'],
      },
    });
    return rows;
  }

  async getLoginRecords(data) {
    const { pageSize, current, ...where } = data;
    const { count, rows } = await this.ctx.model.LoginRecords.findAndCountAll({
      where,
      limit: Number(pageSize),
      offset: Number(pageSize * (current - 1)),
      attributes: {
        exclude: ['userId'],
      },
    });
    return {
      total: count,
      list: rows,
      pageSize,
      current,
    };
  }
}

module.exports = UserService;
