const heroData = require('../../static/converters/parseHeroData.js');

module.exports = {
    up: (queryInterface) => {
        const heroStats = [];
        for (let i = 0; i < heroData.length; i += 1) {
            const tempHero = heroData[i];
            const heroStat = tempHero.heroStats;
            // don't add null records
            if (heroStat.armor) {
                heroStat.heroId = tempHero.id;
                heroStat.createdAt = new Date();
                heroStat.updatedAt = new Date();
                heroStats.push(heroStat);
            }
        }
        return queryInterface.bulkInsert('HeroStats', heroStats, {});
    },
    down: queryInterface => queryInterface.bulkDelete('HeroStats', null, {}),
};
