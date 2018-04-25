/** to generate random int in range(0, maxValue) / maxValue, to get a nice predictable decimal place
 *    for example randomizeValue(10) returns either 0.1,0.2,0.3,...0.9,1.0
 */
function randomizeValue(maxValue) {
    return Math.round(Math.random() * maxValue) / maxValue;
}

function garbageString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

module.exports = {
    up: (queryInterface) => {
        /**
          *  Add altering commands here.
          *  Return a promise to correctly handle asynchronicity.
          */
        const configs = [];
        for (let i = 1; i < 26; i += 1) {
            const configurationDetails = {
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
                },
            };

            configs.push({
                name: `Test bot ${i}`,
                description: 'This bot was seeded into the database',
                title: `Test bot ${i}`,
                configuration: JSON.stringify(configurationDetails),
                user_id: 'google-oauth2|100051510372753624926',
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        return queryInterface.bulkInsert('BotConfigs', configs, {});
    },
    down: queryInterface => queryInterface.bulkDelete('BotConfigs', null, {}),
};
