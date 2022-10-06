const Service = require('egg').Service;
const { Op } = require('sequelize');
const dayjs = require('dayjs');
const NodeRSA = require('node-rsa');

class UserService extends Service {
  async create(user) {
    const result = await this.ctx.model.User.create(user);
    return result;
  }

  async register(user) {
    const { ctx } = this;
    return ctx.model.transaction(async (t) => {
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
      return true;
    });
  }

  async login(user) {
    const { ctx, app } = this;
    const key = new NodeRSA(app.config.rsaInfo.privateKey, {
      encryptionScheme: 'pkcs1',
    });
    const password = key.decrypt(user.password, 'utf8');
    const result = await ctx.model.User.findOne({
      where: {
        name: user.name,
        password,
      },
    });
    if (result) {
      await ctx.service.loginRecords.create({
        name: result.name,
        userId: result.id,
        type: result.type,
      });
    }
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
      include: {
        model: this.ctx.model.Role,
        where: roles
          ? {
              roles,
            }
          : undefined,
        through: {
          // attributes: [],
        },
      },
      order: [['id', 'DESC']],
    });
    return {
      total: count,
      list: rows,
      pageSize,
      current,
    };
  }

  async list(where) {
    const rows = await this.ctx.model.User.findAll({
      where,
      order: [['id', 'DESC']],
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
    const rows = await this.ctx.model.User.findByPk(id);
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
      order: [['id', 'DESC']],
    });
    return {
      total: count,
      list: rows,
      pageSize,
      current,
    };
  }

  async getLoginHistory(id, data) {
    const { pageSize, current, ...where } = data;
    const { count, rows } = await this.ctx.model.LoginRecords.findAndCountAll({
      where: {
        userId: id,
        ...where,
      },
      limit: Number(pageSize),
      offset: Number(pageSize * (current - 1)),
      attributes: {
        exclude: ['userId'],
      },
      order: [['id', 'DESC']],
    });
    return {
      total: count,
      list: rows,
      pageSize,
      current,
    };
  }

  async validateByNameOrEmail(where) {
    const { ctx } = this;
    const data = await ctx.model.User.findOne({
      where,
      paranoid: false,
    });
    if (data) {
      return true;
    }
    return false;
  }
}

module.exports = UserService;
