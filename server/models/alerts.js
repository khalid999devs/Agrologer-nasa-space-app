module.exports = (sequelize, DataTypes) => {
  const alerts = sequelize.define(
    'alerts',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.TEXT,
      },
      imageType: {
        type: DataTypes.STRING,
        defaultValue: 'default',
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );

  alerts.associate = (models) => {
    alerts.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return alerts;
};
