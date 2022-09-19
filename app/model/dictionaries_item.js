module.exports = (app) => {
  const { DataTypes } = app.Sequelize;
  const DictionariesItem = app.model.define(
    'dictionariesItem',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dictionariesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'dictionaries_id',
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
      tableName: 'dictionaries_items',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'value',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'value' }, { name: 'dictionaries_id' }],
        },
      ],
    }
  );
  return DictionariesItem;
};
