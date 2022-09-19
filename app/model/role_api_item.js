module.exports = function (app) {
  const { DataTypes } = app.Sequelize;
  const RoleApiItem = app.model.define(
    'roleApiItem',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role_id',
      },
      apiItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'api_item_id',
      },
      createTime: {
        type: DataTypes.STRING(255),
        field: 'create_time',
        allowNull: false,
      },
      updateTime: {
        type: DataTypes.STRING(255),
        field: 'update_time',
        allowNull: false,
      }
    },
    {
      sequelize: app.model,
      tableName: 'role_api_item',
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

  return RoleApiItem;
};
