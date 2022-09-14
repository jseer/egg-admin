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
    },
    {
      tableName: 'role',
      timestamps: false,
    }
  );
  Role.associate = function() {
    app.model.Role.belongsToMany(app.model.User, { through: {
      model: app.model.UserRole,
      foreignKey: 'user_id',
      otherKey: 'role_Id',
    } });
  };
  return Role;
};
