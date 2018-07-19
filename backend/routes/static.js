const express = require('express');
const models = require('models');
const path = require('path');
const config = require('../../config/config.js');
const fs = require('fs');

const router = express.Router();

function respondToImageRequest(request, response, type) {
    const filePath = path.join(
        __dirname,
        '..',
        '..',
        config.app.imagePath,
        `${type}`,
        `${request.params.imageName}`
    );
    if (fs.existsSync(filePath)) {
        response
            .status(200)
            .sendFile(filePath);
    } else {
        response.status(404).send('File not Found');
    }
}

/* will always return a JSON object of at most 5 bots */
router.get('/items/all', (request, response) => {
    models.Item.findAll({ })
        .then((items) => {
            const newItems = [];
            for (let i = 0; i < items.length; i += 1) {
                newItems.push(items[i]);
                newItems[i].dataValues.url = `/static/items/images/${items[i].id}.png`;
            }
            response.status(200).json({ items });
        }).catch(() => {
            response.status(500).send('Database Error');
        });
});
router.get('/items/images/:imageName', (request, response) => {
    respondToImageRequest(request, response, 'items');
});

router.get('/heroes/all', (request, response) => {
    models.Hero.findAll({
        include: [{
            model: models.HeroStats,
            as: 'heroStats',
        }],
    })
        .then((heroes) => {
            for (let i = 0; i < heroes.length; i += 1) {
                const hero = heroes[i];
                hero.dataValues.url = `/static/heroes/images/${heroes[i].programName}.png`;
                const keys = Object.keys(hero.heroStats.dataValues);
                for (let j = 0; j < keys.length; j += 1) {
                    const key = keys[j];
                    if (!(key === 'id' || key === 'heroId')) {
                        hero.dataValues[key] = hero.heroStats.dataValues[key];
                    }
                }
                hero.dataValues.url_q = `/static/abilities/images/${heroes[i].programName}_q.png`;
                hero.dataValues.url_w = `/static/abilities/images/${heroes[i].programName}_w.png`;
                hero.dataValues.url_e = `/static/abilities/images/${heroes[i].programName}_e.png`;
                hero.dataValues.url_r = `/static/abilities/images/${heroes[i].programName}_r.png`;
            }
            response.status(200).json({ heroes });
        }).catch(() => {
            response.status(500).send('Database Error');
        });
});
router.get('/heroes/images/:imageName', (request, response) => {
    respondToImageRequest(request, response, 'heroes');
});

router.get('/abilities/images/:imageName', (request, response) => {
    respondToImageRequest(request, response, 'abilities');
});
module.exports = router;
