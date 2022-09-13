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
        username: user.username,
        password: user.password,
      },
      attributes: {
        exclude: ['password'],
      },
    });
    return result;
  }

  async update(user) {
    const { password, id, ...data } = user;
    const rows = await this.ctx.model.User.update(data, {
      where: {
        id,
      },
    });
    return rows;
  }
  async page(data) {
    const { pageSize, current, ...whereData } = data;
    const { count, rows } = await this.ctx.model.User.findAndCountAll({
      where: whereData,
      limit: Number(pageSize),
      offset: Number(pageSize * (current - 1)),
      attributes: {
        exclude: ['password'],
      },
    });
    return {
      total: count,
      list: rows,
    };
  }

  async removeByIds(ids) {
    const rows = await this.ctx.model.User.destroy({
      where: {
        id: {
          [Op.in]: ids,
        }
      },
    });
    return rows;
  }
}

module.exports = UserService;
