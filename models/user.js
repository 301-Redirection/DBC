'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        auth0_id: DataTypes.STRING,
    }, {});
    User.associate = (models) => {
        // associations can be defined here
        User.hasOne(models.BotConfig, {
            foreignKey: 'user_id',
            as: 'botConfigs',
        });
    };
    return User;
};