module.exports = function (app) {
  const { DataTypes } = app.Sequelize;
  const LoginRecords = app.model.define(
    'loginRecords',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      loginTime: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'login_time',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'user_id',
      },
      ip: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize: app.model,
      tableName: 'login_records',
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
  return LoginRecords;
};
