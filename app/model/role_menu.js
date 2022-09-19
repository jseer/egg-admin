module.exports = function (app) {
  const { DataTypes } = app.Sequelize;
  const RoleMenu = app.model.define(
    'roleMenu',
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
      menuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'menu_id',
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
      },
    },
    {
      sequelize: app.model,
      tableName: 'role_menu',
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

  return RoleMenu;
};
