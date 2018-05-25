module.exports = (sequelize, DataTypes) => {
    const BotConfig = sequelize.define('BotConfig', {
        configuration: DataTypes.TEXT,
        userId: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {});
    return BotConfig;
};
