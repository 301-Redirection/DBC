'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    let configs = [];
    for (var i = 1; i < 26; i++) {
      configs.push({
                  user_id: i,
                  configuration: '{"push": 0.1, "defend": 0.2, "roshan": 0.5}',
                  createdAt: new Date(),
                  updatedAt: new Date()
                });
    }
    configs.push({
                  user_id: 1,
                  configuration: '{"push": 0.1, "defend": 0.2, "roshan": 0.5}',
                  createdAt: new Date(),
                  updatedAt: new Date()
                });
    return queryInterface.bulkInsert('BotConfigs', configs, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('BotConfigs', null, {});
  }
};
