const Service = require('egg').Service;
const dayjs = require('dayjs');

class TouristService extends Service {
  async create(data) {
    const { ctx } = this;
    return ctx.model.transaction(async (t) => {
      const result = await this.ctx.model.Tourist.create(data, {
        transaction: t,
      });
      //TODO:
      const info = ctx.helper.ip2Locate('58.248.12.198' || ctx.ip);
      await ctx.model.LoginRecords.create(
        {
          name: result.name,
          userId: result.id,
          loginTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          type: result.type,
          ...info,
        },
        { transaction: t }
      );
      return result;
    });
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
