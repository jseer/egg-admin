const { USER_TYPE } = require('../utils/common');

module.exports = function (app) {
  const { DataTypes } = app.Sequelize;
  const Tourist = app.model.define(
    'tourist',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ip: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: USER_TYPE.TOURIST,
      },
      country: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '游客',
      },
      browser: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createTime: {
        type: DataTypes.STRING(255),
        field: 'create_time',
        allowNull: false,
      },
    },
    {
      sequelize: app.model,
      tableName: 'tourist',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  return Tourist;
};
