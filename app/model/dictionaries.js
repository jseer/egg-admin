module.exports = (app) => {
  const { DataTypes } = app.Sequelize;
  const Dictionaries = app.model.define(
    'dictionaries',
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
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: 'code',
      },
      createTime: {
        type: DataTypes.STRING(255),
        field: 'create_time',
        allowNull: false,
      },
      updateTime: {
        type: DataTypes.STRING(255),
        field: 'update_time',
        allowNull: false,
      }
    },
    {
      sequelize: app.model,
      tableName: 'dictionaries',
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

  Dictionaries.associate = function () {
    app.model.Dictionaries.hasMany(app.model.DictionariesItem, {
      foreignKey: 'dictionariesId',
      as: 'items',
    });
  };

  return Dictionaries;
};
