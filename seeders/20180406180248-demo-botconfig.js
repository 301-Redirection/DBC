'use strict';

// to generate random int in range(0, maxValue), assuming maxValue > 0 
function randomizeValue(maxValue) {
    return Math.round(Math.random() * maxValue);
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        /***
          *  Add altering commands here.
          *  Return a promise to correctly handle asynchronicity.
          */
        let configs = [];
        for (var i = 1; i < 26; i++) {
            let configurationDetails =  {
                teamDesires: {
                    defend: {
                        top: randomizeValue(10),
                        mid: randomizeValue(10),
                        bot: randomizeValue(10),
                    },
                    push: {
                        top: randomizeValue(10),
                        mid: randomizeValue(10),
                        bot: randomizeValue(10),
                    },
                    roam: randomizeValue(10),
                    roshan: randomizeValue(10),
                }
            };

            configs.push({
                user_id: i,
                name: "Test bot " + i,
                description: "This bot was seeded into the database",
                title: "Test bot " + i,
                configuration: JSON.stringify(configurationDetails),
                createdAt: new Date(),
                updatedAt: new Date()
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
