module.exports = (sequelize, DataTypes) => {
  const irrigations = sequelize.define(
    'irrigations',
    {
      owner: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      waterData: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      effectsData: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      nearSources: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      sellingData: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      registeredUsers: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      timestamps: true,
    }
  );

  irrigations.associate = (models) => {
    irrigations.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return irrigations;
};
