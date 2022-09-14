'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, TINYINT } = app.Sequelize;

  const User = app.model.define(
    'user',
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
        unique: true,
      },
      email: {
        type: STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING(20),
        allowNull: false,
      },
      gender: {
        type: TINYINT,
        allowNull: false,
      },
    },
    {
      tableName: 'user',
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

  User.associate = function() {
    app.model.User.belongsToMany(app.model.Role, { 
      through: {
        model: app.model.UserRole,
        foreignKey: 'role_id',
        otherKey: 'user_Id',
      },
    });
  };

  return User;
};
