module.exports = (sequelize, DataTypes) => {
  const agrolyzers = sequelize.define(
    'agrolyzers',
    {
      connectionData: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      sensorData: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      todos: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      timestamps: true,
    }
  );

  agrolyzers.associate = (models) => {
    agrolyzers.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return agrolyzers;
};
