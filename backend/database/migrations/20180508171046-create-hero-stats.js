module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('HeroStats', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        primaryAttribute: {
            type: Sequelize.STRING,
        },
        armor: {
            type: Sequelize.FLOAT,
        },
        attackDamageMin: {
            type: Sequelize.FLOAT,
        },
        attackDamageMax: {
            type: Sequelize.FLOAT,
        },
        attackRate: {
            type: Sequelize.FLOAT,
        },
        attackRange: {
            type: Sequelize.FLOAT,
        },
        baseStrength: {
            type: Sequelize.FLOAT,
        },
        baseStrengthGain: {
            type: Sequelize.FLOAT,
        },
        baseAgility: {
            type: Sequelize.FLOAT,
        },
        baseAgilityGain: {
            type: Sequelize.FLOAT,
        },
        baseIntelligence: {
            type: Sequelize.FLOAT,
        },
        baseIntelligenceGain: {
            type: Sequelize.FLOAT,
        },
        moveSpeed: {
            type: Sequelize.INTEGER,
        },
        ability_q: {
            type: Sequelize.STRING,
        },
        ability_w: {
            type: Sequelize.STRING,
        },
        ability_e: {
            type: Sequelize.STRING,
        },
        ability_r: {
            type: Sequelize.STRING,
        },
        heroId: {
            type: Sequelize.INTEGER,
            references: { model: 'Hero', key: 'id', as: 'heroId' },
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: queryInterface => queryInterface.dropTable('HeroStats'),
};
