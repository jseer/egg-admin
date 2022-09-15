module.exports = (app) => {
  const { DataTypes } = app.Sequelize;
  const DictionariesItems = app.model.define(
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
  return DictionariesItems;
};
