'use strict';

const Controller = require('egg').Controller;

class DictionariesController extends Controller {
  async create() {
    const { ctx } = this;
    const data = await ctx.service.dictionaries.create(ctx.request.body);
    ctx.success(data);
  }

  async update() {
    const { ctx } = this;
    await ctx.service.dictionaries.update(ctx.request.body);
    ctx.success(true);
  }

  async page() {
    const { ctx } = this;
    const data = await ctx.service.dictionaries.page(ctx.query);
    ctx.success(data);
  }

  async list() {
    const { ctx } = this;
    const data = await ctx.service.dictionaries.list(ctx.query);
    ctx.success(data);
  }

  async removeByIds() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    const result = await ctx.service.dictionaries.removeByIds(ids);
    ctx.success(result);
  }

  async getDictionariesItemsById() {
    const { ctx } = this;
    const { id } = ctx.query;
    const result = await ctx.service.dictionaries.getDictionariesItemsById(id);
    ctx.success(result);
  }

  async updateDictionariesItems() {
    const { ctx } = this;
    const { list, id } = ctx.request.body;
    const result = await ctx.service.dictionaries.updateDictionariesItems(
      id,
      list
    );
    if (result) {
      ctx.success(true);
    } else {
      ctx.fail('更新失败');
    }
  }

  async getAllDictionaries() {
    const { ctx } = this;
    const result = await ctx.service.dictionaries.getAllDictionaries();
    ctx.success(result);
  }
}

module.exports = DictionariesController;
