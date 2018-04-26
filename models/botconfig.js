module.exports = (sequelize, DataTypes) => {
    const BotConfig = sequelize.define('BotConfig', {
        configuration: DataTypes.TEXT,
        userId: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {});
    // BotConfig.associate = (models) => {
    //     associations can be defined here
    //     BotConfig.belongsTo(models.User, {
    //         foreignKey: 'userId',
    //         as: 'user',
    //     });
    // };
    return BotConfig;
};
