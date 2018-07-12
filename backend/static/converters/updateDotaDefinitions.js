const config = require('../../../config/config.js');
const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
const models = require('../../models');

class Item {
    /*
     * type is one of:
     *     0 => This item can be bought straight
     *     1 => This item has components, but does not need a recipe
     *     2 => This item has components and requires a recipe
     *     3 => This item is a recipe
     */
    constructor(id, name, cost, components, niceName, type) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.components = components;
        this.niceName = niceName;
        this.type = type;
    }
}

class Hero {
    constructor(name, category, niceName, roles, attributes, abilities) {
        this.name = name;
        this.category = category;
        this.niceName = niceName;
        this.roles = roles;
        this.attributes = attributes;
        this.abilities = abilities;
    }
}

const download = function (uri, filename) {
    return new Promise((resolve, reject) => {
        request.head(uri, (err, res) => {
            if (res.statusCode !== 404) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
            } else {
                reject(new Error(`${uri} failed`));
            }
        });
    });
};

function downloadPage(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode !== 200) {
                reject(new Error(`Invalid status code <${response.statusCode}>`));
            }
            resolve(body);
        });
    });
}

function editDistance(i1, i2) {
    const s1 = i1.toLowerCase();
    const s2 = i2.toLowerCase();

    const costs = [];
    for (let i = 0; i <= s1.length; i += 1) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j += 1) {
            if (i === 0) { costs[j] = j; } else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                    newValue = Math.min(
                        Math.min(newValue, lastValue),
                        costs[j]
                    ) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) { costs[s2.length] = lastValue; }
    }
    return costs[s2.length];
}

/* ITEMS */
let items = [];
const { staticURLS } = config.app;

request(staticURLS.items, { json: true }, (err, res, body) => {
    if (!fs.existsSync('backend/static/images/')) {
        fs.mkdirSync('backend/static/images/');
    }
    if (!fs.existsSync('backend/static/images/items/')) {
        fs.mkdirSync('backend/static/images/items/');
    }
    const itemData = body.itemdata;
    const itemNames = Object.keys(itemData);
    for (let i = 0; i < itemNames.length; i += 1) {
        const itemName = itemNames[i];
        const item = itemData[itemName];
        const url = `${config.app.staticURLS.image + itemName}_lg.png`;

        if (item.cost) {
            let totalCost = 0;
            let itemComponents;
            if (item.components) {
                itemComponents = Object.values(item.components);
                for (let j = 0; j < itemComponents.length; j += 1) {
                    if (itemData[itemComponents[j]]) {
                        totalCost += itemData[itemComponents[j]].cost;
                    }
                }
            }
            let type;
            if (totalCost === item.cost && item.components) {
                type = 1;
            } else if (item.components) {
                let foundRecipe = false;
                for (let j = 0; j < itemComponents.length; j += 1) {
                    if (itemComponents[j].indexOf('recipe') !== -1) {
                        foundRecipe = true;
                        break;
                    }
                }
                if (!foundRecipe) {
                    item.components.push(`recipe_${i}`);
                }
                type = 2;
            } else {
                type = 0;
            }
            items.push(new Item(item.id, itemName, item.cost, item.components, item.dname, type));
            download(url, `backend/static/images/items/${item.id}.png`, () => { });
        }
    }

    request(staticURLS.itemsRecipes, { json: true }, (err2, res2, itemsBody) => {
        const recipeData = itemsBody.result.items;
        const recipeValues = Object.values(recipeData);
        for (let i = 0; i < recipeValues.length; i += 1) {
            const item = recipeValues[i];
            if (item.recipe === 1 && item.cost !== 0) {
                items.push(new Item(
                    item.id,
                    item.name.substring(5),
                    item.cost,
                    null,
                    item.localized_name,
                    3
                ));
            }
        }

        const itemValues = Object.values(items);
        for (let i = 0; i < itemValues.length; i += 1) {
            const item = itemValues[i];
            if (item.components) {
                const newComponents = [];
                const itemComponents = Object.values(item.components);
                for (let j = 0; j < itemComponents.length; j += 1) {
                    if (itemData[itemComponents[j]]) {
                        newComponents.push(itemData[itemComponents[j]].id);
                    } else {
                        for (let k = 0; k < itemValues.length; k += 1) {
                            if (itemValues[k].name === itemComponents[j]) {
                                newComponents.push(itemValues[k].id);
                            }
                        }
                    }
                }
                item.components = newComponents;
            }
        }
        const newItems = [];
        for (let i = 0; i < itemValues.length; i += 1) {
            newItems[itemValues[i].id] = itemValues[i];
        }
        items = newItems;
    });
});

/* HEROES */
request(staticURLS.heroes, { json: true }, async (err, res, body) => {
    if (!fs.existsSync('backend/static/images/')) {
        fs.mkdirSync('backend/static/images/');
    }
    if (!fs.existsSync('backend/static/images/abilities/')) {
        fs.mkdirSync('backend/static/images/abilities/');
    }
    // console.log(body);
    const heroData = body.herodata;
    const heroes = {};
    request(staticURLS.heroAbilityReference, { }, async (err2, res2, heroAbilityBody) => {
        const heroesPage = cheerio.load(heroAbilityBody);
        const heroURLS = [];
        heroesPage('.heroPickerIconLink').each((i, elem) => {
            heroURLS.push(heroesPage(elem).attr('href'));
        });
        // const counter = 0;
        const heroDataKeys = Object.keys(heroData);
        const numHeroes = heroDataKeys.length;
        for (let i = 0; i < numHeroes; i += 1) {
            const heroName = heroDataKeys[i];
            const hero = heroData[heroName];
            heroes[heroName] = new Hero(
                heroName,
                hero.pa,
                hero.dname,
                hero.droles,
                hero.attribs,
                []
            );
            const heroObject = heroes[heroName];

            const shortName = heroName;// i.replace(/_/g,"");
            const comparator = config.app.staticURLS.heroAbilities + shortName;
            let bestEditDistance = comparator.length * 2;
            let heroPageURL = heroURLS[0];
            const heroURLSValues = Object.values(heroURLS);
            for (let j = 0; j < heroURLSValues.length; j += 1) {
                const ed = editDistance(comparator, heroURLSValues[j]);
                if (ed < bestEditDistance) {
                    heroPageURL = heroURLSValues[j];
                    bestEditDistance = ed;
                }
            }

            const HTML = await downloadPage(heroPageURL); // eslint-disable-line no-await-in-loop
            const $ = cheerio.load(HTML);
            let abilityNum = 0;
            const row = $('.overviewAbilityRow');
            for (let j = 0; j < row.length; j += 1) {
                // console.log(row.get(i));
                const $elem = $(row.get(j));
                const text = $elem.find('.overviewAbilityRowDescription h2').text();
                const ability = text.replace(/(\(.*\))/g, '').trim();
                const results = [];
                if (text && heroObject.abilities.indexOf(ability) === -1) {
                    heroObject.abilities.push(ability);
                    const img = $elem.find('.overviewAbilityImg').attr('src');
                    const qwer = 'qwer'.charAt(abilityNum);
                    results.push(download(img, `backend/static/images/abilities/${heroObject.name}_${qwer}.png`));
                    abilityNum += 1;
                }
                await Promise.all(results); // eslint-disable-line no-await-in-loop
            }
            heroObject.abilities.splice(4);
            for (let j = heroObject.abilities.length; j < 4; j += 1) {
                heroObject.abilities.push('');
            }
            const results = [];
            results.push(models.Hero.create({
                programName: heroObject.name,
                niceName: heroObject.niceName,
                roles: heroObject.roles,
            })
                .then((newHero) => {
                    models.HeroStats.create({
                        heroId: newHero.dataValues.id,
                        primaryAttribute: heroObject.category,
                        ability_q: heroObject.abilities[0],
                        ability_w: heroObject.abilities[1],
                        ability_e: heroObject.abilities[2],
                        ability_r: heroObject.abilities[3],
                        movespeed: heroObject.attributes.ms,
                        armor: heroObject.attributes.armor,
                        attackDamageMin: heroObject.attributes.dmg.min,
                        attackDamageMax: heroObject.attributes.dmg.max,
                        baseStrength: heroObject.attributes.str.b,
                        baseStrengthGain: heroObject.attributes.str.g,
                        baseAgility: heroObject.attributes.agi.b,
                        baseAgilityGain: heroObject.attributes.agi.g,
                        baseIntelligence: heroObject.attributes.int.b,
                        baseIntelligenceGain: heroObject.attributes.int.g,
                    }).then();
                }));

            await Promise.all(results); // eslint-disable-line no-await-in-loop

            // console.log(`${Math.round(counter / numHeroes * 10000) / 100}%`);
            // counter += 1;
            // break;
        }
        // console.log("\n\n\n\n\n\n done and stuff");
        models.sequelize.close();
    });
});
