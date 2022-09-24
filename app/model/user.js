'use strict';
const { USER_TYPE } = require('../utils/common');
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

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
        type: INTEGER,
        allowNull: false,
      },
      type: {
        type: STRING(255),
        allowNull: false,
        defaultValue: USER_TYPE.ACCOUNT,
      },
      deleteAt: {
        type: STRING(255),
        allowNull: true,
        field: 'delete_at',
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
      tableName: 'user',
      timestamps: false,
      custom_paranoid: true,
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
        foreignKey: 'user_id',
        otherKey: 'role_Id',
      },
    });
  };

  return User;
};
