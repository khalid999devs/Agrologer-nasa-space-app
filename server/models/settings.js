module.exports = (sequelize, DataTypes) => {
  const settings = sequelize.define(
    'settings',
    {
      language: {
        type: DataTypes.STRING,
        defaultValue: 'eng',
      },
      location: {
        type: DataTypes.JSONB,
        defaultValue: {},
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

  settings.associate = (models) => {
    settings.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return settings;
};
