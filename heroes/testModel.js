const models = require('../models');

models.Hero.findAll({
    include: [{
        model: models.HeroStats,
        as: 'heroStats',
    }],
})
    .then((heroes) => {
        for (let i = 0; i < heroes.length; i += 1) {
            if (i < 5) {
                const hero = heroes[i];
                // console.log(hero);
                if (hero.heroStats) {
                    // console.log(`${hero.name}->${hero.heroStats.primaryAttribute}`);
                }
            }
        }
    });
