module.exports = (sequelize, DataTypes) => {
  const discussions = sequelize.define(
    'discussions',
    {
      owner: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      text: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.ENUM('text', 'file', 'textFile'),
        defaultValue: 'text',
        allowNull: false,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      replyTo: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      mentions: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      filesURL: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
    },
    {
      timestamps: true,
    }
  );

  discussions.associate = (models) => {
    discussions.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return discussions;
};
