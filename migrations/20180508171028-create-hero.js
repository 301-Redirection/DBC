
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Hero', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
        alignment: {
            type: Sequelize.STRING,
        },
        roles: {
            type: Sequelize.STRING,
        },
        complexity: {
            type: Sequelize.INTEGER,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Hero'),
};
