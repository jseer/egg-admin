const Service = require('egg').Service;
const { Op } = require('sequelize');

class UserService extends Service {
  async create(user) {
    const result = await this.ctx.model.User.create(user);
    return result;
  }
  async login(user) {
    const result = await this.ctx.model.User.findOne({
      where: {
        name: user.name,
        password: user.password,
      },
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: this.app.model.Role,
        through: { attributes: [] },
      },
    });
    return result;
  }

  async update(user) {
    const { password, id, roles, ...data } = user;
    await this.ctx.model.transaction(async (t) => {
      let where = null;
      if (roles) {
        where = {
          code: {
            [Op.in]: roles,
          },
        };
      }
      const roleList = await this.ctx.model.Role.findAll({
        where,
      });
      await this.ctx.model.User.update(
        data,
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );
      const user = await this.ctx.model.User.findOne({
        where: {
          id,
        },
      });

      await user.setRoles(roleList, { transaction: t });
    });
  }
  async page(data) {
    const { pageSize, current, roles, ...whereData } = data;
    const roleList = roles?.split(',');
    let includeWhere = null;
    if (roles) {
      includeWhere = {
        code: {
          [Op.in]: roleList,
        },
      };
    }

    const { count, rows } = await this.ctx.model.User.findAndCountAll({
      where: whereData,
      limit: Number(pageSize),
      offset: Number(pageSize * (current - 1)),
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: this.ctx.model.Role,
        where: includeWhere,
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
        exclude: ['password']
      }
    });
    return rows;
  }

  async removeByIds(ids) {
    const rows = await this.ctx.model.User.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return rows;
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
        exclude: ['password']
      }
    });
    return rows;
  }
}

module.exports = UserService;
