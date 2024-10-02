module.exports = (sequelize, DataTypes) => {
  const predictions = sequelize.define(
    'predictions',
    {
      severityLvls: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      severMonthBarLvl: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      severMapAreaLvl: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      timestamps: true,
    }
  );

  predictions.associate = (models) => {
    predictions.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return predictions;
};
