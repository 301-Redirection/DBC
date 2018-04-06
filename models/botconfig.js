'use strict';

module.exports = (sequelize, DataTypes) => {
  var BotConfig = sequelize.define('BotConfig', {
    configuration: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});
  BotConfig.associate = (models) => {
    // associations can be defined here
    // BotConfig.belongsTo(User);
    BotConfig.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };
  return BotConfig;
};