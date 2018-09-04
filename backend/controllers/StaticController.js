/**
 *  This is class to interact with both the database objects and
 *  image files already present on the server to provide to the
 *  front-end with data as needed
 */

const fs = require('fs');
const models = require('models');
const path = require('path');
const config = require('../../config/config.js');

const { unimplentedHeroes, unpurchasableItems } = config.lua;

class StaticController {
    // A generic function to return an image given a type
    // Note that the route generally supplies the type and
    // hence it is still secure
    static respondToImageRequest(request, response, type) {
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

    // returns a json of all items in database with an API link
    // to load the image (see prior function)
    static getAllItems(request, response) {
        models.Item.findAll({ })
            .then((items) => {
                const newItems = [];
                for (let i = 0; i < items.length; i += 1) {
                    const item = items[i];
                    const isUnpurchasable = unpurchasableItems.indexOf(item.name) !== -1;
                    if (!isUnpurchasable) {
                        item.dataValues.url = `/static/items/images/${item.id}.png`;
                        newItems.push(item);
                    }
                }
                response.status(200).json({ items: newItems });
            })
            .catch(() => {
                response.status(500).send('Database Error');
            });
    }

    // returns a json of all heroes in database with an API link
    // to load the image of that hero's abilities (see prior function)
    static getAllHeroes(request, response) {
        models.Hero.findAll({
            include: [{
                model: models.HeroStats,
                as: 'heroStats',
            }],
        })
            .then((heroes) => {
                const finalHeroes = [];
                // only return add a hero to final output if they have implemented bots
                for (let i = 0; i < heroes.length; i += 1) {
                    const hero = heroes[i];
                    const isUnimplemented = unimplentedHeroes.indexOf(hero.programName) !== -1;
                    if (!isUnimplemented) {
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
                        finalHeroes.push(hero);
                    }
                }
                response.status(200).json({ heroes: finalHeroes });
            }).catch(() => {
                response.status(500).send('Database Error');
            });
    }
}
module.exports.StaticController = StaticController;
