module.exports = () => {
  const isEmpty = (v) => {
    return v == null || v === '';
  };
  const filterMap = (obj) => {
    for (const key in obj) {
      const value = obj[key];
      if (isEmpty(value)) {
        delete obj[key];
      }
    }
  };
  return async (ctx, next) => {
    filterMap(ctx.query);
    await next();
  };
};
