'use strict';
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

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
    },
    {
      tableName: 'menu',
      timestamps: false,
    }
  );
  return Menu;
};
