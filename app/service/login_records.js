const Service = require('egg').Service;
const { QueryTypes } = require('sequelize');
const dayjs = require('dayjs');
const parser = require('ua-parser-js');
class LoginRecordsService extends Service {
  async continuousLoginDays(id) {
    const { ctx } = this;
    const result = await ctx.model.query(
      `
      SELECT name
      ,
      ( date_days - date_rank ) AS date_diff,
      count(*) AS count
      FROM
        (
        SELECT
          *,
          DATEDIFF( login_date, '1970-01-01' ) AS date_days 
        FROM
          (
          SELECT name
            ,
            login_date,
            ROW_NUMBER() OVER () AS date_rank 
          FROM
            (
            SELECT name
              ,
              DATE_FORMAT( login_time, '%Y-%m-%d' ) AS login_date 
            FROM
              login_records 
            WHERE
              type = 'account' 
              AND
              user_id= ?
            GROUP BY
              name,
              login_date 
            ) AS t1 
          ) AS t2 
        ORDER BY
          login_date DESC 
        ) AS t3 
      GROUP BY
        name,
        date_diff 
      ORDER BY
        date_diff DESC 
        LIMIT 1;
    `,
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    return result;
  }

  async create(data) {
    const { ctx } = this;
    const ua = parser(ctx.headers['user-agent']);
    const browser = ua.browser.name + '/' + ua.browser.version;
    //TODO:
    const ipInfo = ctx.helper.ip2Locate('58.248.12.198' || ctx.ip);
    return ctx.model.LoginRecords.create({
      ...ipInfo,
      browser,
      ...data,
      loginTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
  }
}

module.exports = LoginRecordsService;
