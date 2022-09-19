module.exports = function checkLogin() {
  return async (ctx, next) => {
    if (ctx.session) {
      if (ctx.session.user) {
        const { Op } = ctx.app.Sequelize;
        const roles = await ctx.model.Role.findAll({
          attributes: ['code'],
          where: {
            id: {
              [Op.in]: ctx.model.literal(`(
                SELECT role_id
                FROM user_role
                WHERE
                    user_role.user_id = ${ctx.session.user.id}
            )`),
            },
          },
        });
        ctx.session.roles = roles.map(role => role.code);
      }
      await next();
    } else {
      ctx.fail('未登录', 401);
    }
  };
};
