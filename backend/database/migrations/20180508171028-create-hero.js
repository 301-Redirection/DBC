module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Hero', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        programName: {
            type: Sequelize.STRING,
        },
        niceName: {
            type: Sequelize.STRING,
        },
        roles: {
            type: Sequelize.STRING,
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
    down: queryInterface => queryInterface.dropTable('Hero'),
};
