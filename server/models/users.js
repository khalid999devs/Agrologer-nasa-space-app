module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      fullName: {
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
      },
      phoneNum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.ENUM('farmer', 'expert'),
        defaultValue: 'farmer',
        allowNull: false,
      },
      level: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      finance: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      cropHistory: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      farmerLoc: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      fieldLoc: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      timestamps: true,
    }
  );

  users.associate = (models) => {
    users.hasOne(models.dashboards, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    users.hasMany(models.alerts, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    users.hasOne(models.agrolyzers, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    users.hasOne(models.settings, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    users.hasOne(models.predictions, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    users.hasMany(models.weathers, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    users.hasMany(models.discussions, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    users.hasMany(models.irrigations, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return users;
};
