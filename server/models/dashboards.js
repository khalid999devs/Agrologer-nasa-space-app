module.exports = (sequelize, DataTypes) => {
  const dashboards = sequelize.define(
    'dashboards',
    {
      deviceStats: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      pestCondition: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      soilCondition: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      floodChance: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      droughtChance: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      currentWeather: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      timestamps: true,
    }
  );

  dashboards.associate = (models) => {
    dashboards.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return dashboards;
};
