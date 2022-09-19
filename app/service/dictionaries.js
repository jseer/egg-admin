const Service = require('egg').Service;
const { Op } = require('sequelize');

class DictionariesService extends Service {
  async create(data) {
    const result = await this.ctx.model.Dictionaries.create(data);
    return result;
  }

  async update(user) {
    const { id, ...data } = user;
    const rows = await this.ctx.model.Dictionaries.update(data, {
      where: {
        id,
      },
    });
    return rows;
  }
  async page(data) {
    const { pageSize, current, ...whereData } = data;
    const limit = Number(pageSize);
    const offset = Number(pageSize * (current - 1));
    const { count, rows } = await this.ctx.model.Dictionaries.findAndCountAll({
      where: whereData,
      limit,
      offset,
      include: {
        model: this.ctx.app.model.DictionariesItem,
        as: 'items',
        attributes: {
          exclude: ['dictionariesId'],
        },
      },
    });
    return {
      total: count,
      list: rows,
      pageSize: limit,
      current: Number(current),
    };
  }
  async removeByIds(ids) {
    const rows = await this.ctx.model.Dictionaries.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return rows;
  }

  async getDictionariesItemById(id) {
    const rows = await this.ctx.model.DictionariesItem.findAll({
      where: {
        dictionaries_id: id,
      },
      attributes: {
        exclude: ['dictionariesId'],
      },
    });
    return rows;
  }

  async updateDictionariesItem(id, list) {
    const { ctx } = this;
    const dictionary = await ctx.model.Dictionaries.findByPk(id);
    if (dictionary) {
      await this.ctx.model.transaction(async (t) => {
        const ids = list.map((l) => l.id).filter(Boolean);
        await ctx.model.DictionariesItem.destroy(
          {
            where: {
              id: {
                [Op.notIn]: ids,
              },
              dictionaries_id: id,
            },
          },
          {
            transaction: t,
          }
        );
        list.forEach((l) => (l.dictionariesId = id));
        await ctx.model.DictionariesItem.bulkCreate(list, {
          updateOnDuplicate: ['label', 'value'],
          transaction: t,
        });
      });
      return true;
    }
    return false;
  }

  async getAllDictionaries() {
    const { ctx } = this;
    const result = await ctx.model.Dictionaries.findAll({
      include: {
        model: ctx.model.DictionariesItem,
        as: 'items',
        attributes: ['label', 'value'],
      },
      order: [['items', 'value']]
    });
    const map = {};
    result.forEach((r) => {
      map[r.code] = r.items;
    });
    return map;
  }
}

module.exports = DictionariesService;
