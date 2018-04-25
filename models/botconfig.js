module.exports = (sequelize, DataTypes) => {
    const BotConfig = sequelize.define('BotConfig', {
        configuration: DataTypes.TEXT,
        user_id: DataTypes.STRING,
        name : DataTypes.STRING,
        description: DataTypes.STRING,
        user_id: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {});
    // BotConfig.associate = (models) => {
    //     associations can be defined here
    //     BotConfig.belongsTo(models.User, {
    //         foreignKey: 'user_id',
    //         as: 'user',
    //     });
    // };
    return BotConfig;
};