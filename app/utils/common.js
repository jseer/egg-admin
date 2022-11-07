exports.USER_TYPE = {
  ACCOUNT: 'account',
  TOURIST: 'tourist',
};

exports.COUNT_MAP_TYPE = {
  today: 'today',
  week: 'week',
  month: 'month',
};

exports.TOURIST_INFO = {
  name: '游客',
  type: 'tourist',
};

exports.INIT_DATA_CONFIG = {
  redis_key: 'initSql',
  mq: {
    exchange: 'initSql_exchange',
  },
};

