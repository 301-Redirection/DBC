module.exports = (sequelize, DataTypes) => {
    const Hero = sequelize.define(
        'Hero', {
            programName: DataTypes.STRING,
            niceName: DataTypes.STRING,
            roles: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            tableName: 'Hero',
        }
    );
    Hero.associate = function (models) {
        // associations can be defined here
        Hero.hasOne(models.HeroStats, {
            foreignKey: 'heroId',
            as: 'heroStats',
        });
    };
    return Hero;
};
