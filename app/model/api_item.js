module.exports = function (app) {
  const { DataTypes } = app.Sequelize;
  const ApiItem = app.model.define(
    'apiItem',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'code',
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'parent_id',
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
      },
      needLogin: {
        type: DataTypes.TINYINT,
        field: 'need_login',
      },
      needCheck: {
        type: DataTypes.TINYINT,
        field: 'need_check',
      },
      method: {
        type: DataTypes.STRING(255),
        field: 'method',
        allowNull: false,
      },
      createTime: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'create_time'
      },
      updateTime: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'update_time'
      },
    },
    {
      sequelize: app.model,
      tableName: 'api_items',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'code',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'code' }],
        },
      ],
    }
  );

  ApiItem.associate = function() {
    ApiItem.belongsToMany(app.model.Role, { 
      through: {
        model: app.model.RoleApiItem,
        foreignKey: 'api_item_id',
        otherKey: 'role_id',
      },
    });
  };

  return ApiItem;
};
