module.exports = (sequelize, DataTypes) => {
    const HeroStats = sequelize.define('HeroStats', {
        primaryAttribute: DataTypes.STRING,
        ability_q: DataTypes.STRING,
        ability_w: DataTypes.STRING,
        ability_e: DataTypes.STRING,
        ability_r: DataTypes.STRING,
        moveSpeed: DataTypes.INTEGER,
        armor: DataTypes.FLOAT,
        attackDamageMin: DataTypes.FLOAT,
        attackDamageMax: DataTypes.FLOAT,
        attackRate: DataTypes.FLOAT,
        attackRange: DataTypes.FLOAT,
        baseStrength: DataTypes.FLOAT,
        baseStrengthGain: DataTypes.FLOAT,
        baseAgility: DataTypes.FLOAT,
        baseAgilityGain: DataTypes.FLOAT,
        baseIntelligence: DataTypes.FLOAT,
        baseIntelligenceGain: DataTypes.FLOAT,
        heroId: DataTypes.INTEGER,
    }, {});
    HeroStats.associate = function (models) {
        // associations can be defined here
        HeroStats.belongsTo(models.Hero, {
            foreignKey: 'heroId',
            as: 'hero',
        });
    };
    return HeroStats;
};
