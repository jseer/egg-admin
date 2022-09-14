'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, TINYINT } = app.Sequelize;

  const UserRole = app.model.define(
    'userRole',
    {
      id: {
        autoIncrement: true,
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: STRING(20),
        unique: true,
        allowNull: false,
        field: 'user_id'
      },
      roleId: {
        type: STRING(20),
        unique: true,
        allowNull: false,
        field: 'role_id',
      },
    },
    {
      tableName: 'user_role',
      timestamps: false,
    }
  );
  return UserRole;
};
