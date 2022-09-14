const Service = require('egg').Service;
const { Op } = require('sequelize');

class UserService extends Service {
  async create(user) {
    const result = await this.ctx.model.Role.create(user);
    return result;
  }

  async update(user) {
    const { id, ...data } = user;
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
    const rows = await this.ctx.model.Role.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return rows;
  }

  async findById(id) {
    const rows = await this.ctx.model.Role.findByPk(id, {
    });
    return rows;
  }
}

module.exports = UserService;
