'use strict';
const Controller = require('egg').Controller;
const { COUNT_MAP_TYPE } = require('../utils/common');

class SystemController extends Controller {
  async getLoginRecords() {
    const { ctx } = this;
    const result = await ctx.service.user.getLoginRecords(
      ctx.helper.query2where(ctx.query)
    );
    ctx.success(result);
  }

  async continuousLoginDays() {
    const { ctx } = this;
    const { id } = ctx.session.user;
    const result = await ctx.service.loginRecords.continuousLoginDays(id);
    ctx.success(result[0]?.count);
  }

  async getCountMap() {
    const { ctx } = this;
    const type = ctx.query.type;
    const userTotalQuery = ctx.model.User.count();
    let where = '';
    let loginRecordsWhere = '';
    if (type === COUNT_MAP_TYPE.today) {
      where = 'DATE(create_time) = CURRENT_DATE()';
      loginRecordsWhere = 'DATE(login_time) = CURRENT_DATE()';
    } else if (type === COUNT_MAP_TYPE.week) {
      where =
        'DATE( create_time ) >= DATE_SUB( CURRENT_DATE (), INTERVAL 1 WEEK )';
      loginRecordsWhere =
        'DATE( login_time ) >= DATE_SUB( CURRENT_DATE (), INTERVAL 1 WEEK )';
    } else if (type === COUNT_MAP_TYPE.month) {
      where =
        'DATE( create_time ) >= DATE_SUB( CURRENT_DATE (), INTERVAL 1 MONTH )';
      loginRecordsWhere =
        'DATE( login_time ) >= DATE_SUB( CURRENT_DATE (), INTERVAL 1 MONTH )';
    }
    if (COUNT_MAP_TYPE[type]) {
      const [newUser, tourist, login, userTotal] = await Promise.all([
        ctx.model.User.count({
          where: ctx.model.literal(where),
        }),
        ctx.model.Tourist.count({
          where: ctx.model.literal(where),
        }),
        ctx.model.LoginRecords.count({
          where: ctx.model.literal(`
            ${loginRecordsWhere} AND type = 'account'
          `),
        }),
        userTotalQuery,
      ]);
      ctx.success({
        newUser,
        tourist,
        login,
        userTotal,
      });
    } else {
      ctx.success({});
    }
  }
}

module.exports = SystemController;
