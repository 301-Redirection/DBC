const config = require('../../../config/config.js');
const request = require('request');
const fs = require('fs');

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var download = async function(uri, filename, callback){
  await request.head(uri, function(err, res, body){
    if(res.statusCode != 404) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    } else {
        console.log(uri + " failed");
    }
  });
};

/* ITEMS */
// let items = [];
// request(config.app.staticURLS.items, { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     if (!fs.existsSync("backend/static/images/")){
//         fs.mkdirSync("backend/static/images/");
//     }
//     if (!fs.existsSync("backend/static/images/items/")){
//         fs.mkdirSync("backend/static/images/items/");
//     }
//     let itemData = body.itemdata;
//     for(i in itemData) {
//         let item = itemData[i];
//         let url = config.app.staticURLS.image + i + "_lg.png";
        
//         if(item.cost) {
//                     let totalCost = 0
//             for(j in item.components) {
//                 if(itemData[item.components[j]]) {
//                     totalCost += itemData[item.components[j]].cost;
//                 } else {
//                     console.log("Could not find " + item.components[j] + " belonging to " + i);
//                 }
//             }
//             let type;
//             if(totalCost == item.cost && item.components) {
//                 type = 1;
//             } else if(item.components) {
//                 let found_recipe = false;
//                 for(j in item.components) {
//                     if(item.components[j].indexOf("recipe") !== -1) {
//                         found_recipe = true;
//                         break;
//                     }
//                 }
//                 if(!found_recipe) {
//                     item.components.push("recipe_" + i);
//                 }
//                 type = 2;
//             } else {
//                 type = 0;
//             }
//             items.push(new Item(item.id, i, item.cost, item.components, item.dname, type));
//             // download(url, `backend/static/images/items/${item.id}.png`, () => { });
//         }
//     }

//     request(config.app.staticURLS.itemsRecipes, { json: true }, (err, res, body) => {
//         if (err) { return console.log(err); }

//         let recipeData = body.result.items;
//         for(i in recipeData) {
//             let item = recipeData[i];
//             if(item.recipe == 1 && item.cost != 0) {
//                 items.push(new Item(item.id, item.name.substring(5), item.cost, null, item.localized_name, 3))
//             }
//         }
//         for(i in items) {
//             let item = items[i];
//             if(item.components) {
//                 let newComponents = [];
//                 for(j in item.components) {
//                     if(itemData[item.components[j]]) {
//                         newComponents.push(itemData[item.components[j]].id)
//                     } else {
//                         for(k in items) {
//                             if(items[k].name == item.components[j]) {
//                                 newComponents.push(items[k].id)
//                             }
//                         }
//                     }
//                 }
//                 item.components = newComponents;
//             }
//         }
//         console.log(items);
//         let newItems = [];
//         for(i in items) {
//             newItems[items[i].id] = items[i];
//         }
//         items = newItems;
//         console.log(items);
//     });
// });

/* HEROES */
request(config.app.staticURLS.heroes, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    // console.log(body);
    let heroData = body.herodata;
    let heroes = {};
    for(i in heroData) {
        let hero = heroData[i];
        heroes[i] = new Hero(i, hero.pa, hero.dname, hero.droles.split(" - "), hero.attribs, []);
    }
    request(config.app.staticURLS.abilities, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body);
    });
    
    // console.log(heroes.dark_willow.attributes);
    // for(i in itemdata) {
    //     let item = itemdata[i];
    //     let url = config.app.staticURLS.image + item.img;
    //     console.log(item.id);
    //     download(url, `backend/static/images/items/${item.id}.png`, () => { });
    // }
});

