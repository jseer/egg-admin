module.exports = function (app) {
  const { DataTypes } = app.Sequelize;
  const Logger = app.model.define(
    'logger',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      method: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      create_time: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize: app.model,
      tableName: 'logger',
      timestamps: false,
    }
  );

  return Logger;
};
