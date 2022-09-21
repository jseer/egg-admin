const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "name"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_time: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    update_time: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "account"
    },
    delete_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
