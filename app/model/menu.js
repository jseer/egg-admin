'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, TINYINT } = app.Sequelize;

  const Menu = app.model.define(
    'menu',
    {
      id: {
        autoIncrement: true,
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: STRING(20),
        allowNull: false,
      },
      code: {
        type: STRING(20),
        unique: true,
        allowNull: false,
      },
      type: {
        type: STRING(255),
      },
      parentId: {
        type: INTEGER,
        field: 'parent_id',
      },
      path: {
        type: STRING(255),
      },
      sort: {
        type: TINYINT,
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
      }
    },
    {
      tableName: 'menu',
      timestamps: false,
    }
  );


  Menu.associate = function() {
    app.model.Menu.belongsToMany(app.model.Role, { 
      through: {
        model: app.model.RoleMenu,
        foreignKey: 'menu_id',
        otherKey: 'role_id',
      },
    });
  };

  return Menu;
};
