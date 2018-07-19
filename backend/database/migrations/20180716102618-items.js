module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Items', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
        cost: {
            type: Sequelize.INTEGER,
        },
        components: {
            type: Sequelize.STRING,
        },
        niceName: {
            type: Sequelize.STRING,
        },
        type: {
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
    down: queryInterface => queryInterface.dropTable('Items'),
};
