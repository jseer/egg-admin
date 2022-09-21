'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, TINYINT } = app.Sequelize;

  const Role = app.model.define(
    'role',
    {
      id: {
        autoIncrement: true,
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: STRING(20),
        unique: true,
        allowNull: false,
      },
      code: {
        type: STRING(20),
        unique: true,
        allowNull: false,
      },
      status: {
        type: TINYINT,
        allowNull: false,
      },
      createTime: {
        type: STRING(255),
        field: 'create_time',
        allowNull: false,
      },
      updateTime: {
        type: STRING(255),
        field: 'update_time',
        allowNull: false,
      },
    },
    {
      tableName: 'role',
      timestamps: false,
    }
  );
  Role.associate = function () {
    Role.belongsToMany(app.model.User, {
      through: {
        model: app.model.UserRole,
      },
    });
    Role.belongsToMany(app.model.ApiItem, {
      through: {
        model: app.model.RoleApiItem,
      },
    });
    Role.belongsToMany(app.model.Menu, {
      through: {
        model: app.model.RoleMenu,
      },
    });
  };
  return Role;
};
