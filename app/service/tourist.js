const Service = require('egg').Service;

class TouristService extends Service {
  async create(data) {
    const result = await this.ctx.model.Tourist.create(data);
    return result;
  }

  async findById(id) {
    const rows = await this.ctx.model.Tourist.findByPk(id);
    return rows;
  }

  async page(data) {
    const { pageSize, current, ...whereData } = data;
    const { count, rows } = await this.ctx.model.Tourist.findAndCountAll({
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
}

module.exports = TouristService;
