const heroData = require('../heroes/parseHeroData.js');

module.exports = {
    up: (queryInterface) => {
        const heroStats = [];
        let recordCount = 0;
        for (let i = 0; i < heroData.length; i += 1) {
            const tempHero = heroData[i];
            const heroStat = tempHero.heroStats;
            // don't add null records
            if (heroStat.armor) {
                heroStat.heroId = recordCount + 1;
                heroStat.createdAt = new Date();
                heroStat.updatedAt = new Date();
                heroStats.push(heroStat);
                recordCount += 1;
            }
        }
        return queryInterface.bulkInsert('HeroStats', heroStats, {});
    },
    down: queryInterface => queryInterface.bulkDelete('HeroStats', null, {}),
};
