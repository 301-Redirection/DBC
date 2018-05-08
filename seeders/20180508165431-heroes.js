const heroData = require('../heroes/parseHeroData.js');

module.exports = {
    up: (queryInterface) => {
        const heroes = [];
        for (let i = 0; i < heroData.length; i += 1) {
            const tempHero = heroData[i];
            const heroInfo = tempHero.hero;
            if (heroInfo.name) {
                heroInfo.createdAt = new Date();
                heroInfo.updatedAt = new Date();
                heroes.push(heroInfo);
            }
        }
        return queryInterface.bulkInsert('Hero', heroes, {});
    },
    down: queryInterface => queryInterface.bulkDelete('Hero', null, {}),
};
