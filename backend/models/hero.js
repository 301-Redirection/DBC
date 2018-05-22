module.exports = (sequelize, DataTypes) => {
    const Hero = sequelize.define(
        'Hero', {
            name: DataTypes.STRING,
            alignment: DataTypes.STRING,
            roles: DataTypes.STRING,
            complexity: DataTypes.INTEGER,
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
