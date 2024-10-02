module.exports = (sequelize, DataTypes) => {
  const weathers = sequelize.define(
    'weathers',
    {
      month: {
        type: DataTypes.STRING,
      },
      day: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.TIME,
      },
      summary: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      timestamps: true,
    }
  );

  weathers.associate = (models) => {
    weathers.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return weathers;
};
