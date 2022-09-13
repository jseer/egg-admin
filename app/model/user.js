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
      username: {
        type: STRING(20),
        allowNull: false,
      },
      email: {
        type: STRING(255),
        allowNull: false,
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

  return User;
};
