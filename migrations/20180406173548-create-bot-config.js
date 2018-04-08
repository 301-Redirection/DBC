'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('BotConfigs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
                configuration: {
                type: Sequelize.TEXT,
            },
                user_id: {
                type: Sequelize.INTEGER,
                references: { model: 'Users', key: 'id', as: 'user_id'},
            },
                createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
                updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('BotConfigs');
    }
};