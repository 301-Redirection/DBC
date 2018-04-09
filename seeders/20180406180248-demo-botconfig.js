'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /***
          *  Add altering commands here.
          *  Return a promise to correctly handle asynchronicity.
          */
        let configs = [];
        for (var i = 1; i < 26; i++) {
            configs.push({
                user_id: i,
                name: "Test bot " + i,
                description: "This bot was seeded into the database",
                title: "Test bot " + i,
                configuration: '{"push": 0.1, "defend": 0.2, "roshan": 0.5}',
                created_at: new Date(),
                updated_at: new Date()
            });
        }
        return queryInterface.bulkInsert('BotConfigs', configs, {});

    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity
        */
        return queryInterface.bulkDelete('BotConfigs', null, {});
    }
};
