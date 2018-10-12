const path = require('path');
const fs = require('fs-extra');
const config = require('../../../config/config.js');
const { LuaCodeGenerator } = require('./LuaCodeGenerator.js');

const NEW_LINE = LuaCodeGenerator.getNewLine();
const HERO_SELECT_TEMPLATE_FOLDER_NAME = 'heroSelectionTemplate';
const PATH_TO_TEMPLATE_SCRIPTS = path.join(__dirname, '..', '..', 'static', 'codeTemplates');

class HeroCodeGenerator {
    /**
     * This generates the content of the hero_selection.lua
     *
     * This expects an object like the following:
     *
     *  const heroes1 = {
     *       partitioned: false,
     *       pool: [
     *               {
     *                   name: 'drow_ranger',
     *                   position: -1,
     *               },
     *               {
     *                   name: 'bane',
     *                   position: -1,
     *               },
     *               {
     *                   name: 'alchemist',
     *                   position: -1,
     *               },
     *               {
     *                   name: 'abaddon',
     *                   position: -1,
     *               },
     *               {
     *                   name: 'antimage',
     *                   position: -1,
     *               },
     *               {
     *                   name: 'axe',
     *                   position: -1,
     *               },
     *               {
     *                   name: 'bloodseeker',
     *                   position: -1,
     *               },
     *               {
     *                   name: 'centaur',
     *                   position: -1,
     *               },
     *               {
     *                   name: 'chen',
     *                   position: -1,
     *               },
     *               {
     *                   name: 'chaos_knight',
     *                   position: -1,
     *               },
     *               {
     *                    name: 'crystal_maiden',
     *                    position: -1,
     *                },
     *           ],
     *
     * This uses the static bot script as a template and generates the corresponding pools
     * as lua tables in an array where each element is the associated pool
     *
     */
    static generateHeroesCode(heroes) {
        const final = [];
        // return if hero object not proper not
        if (!heroes.pool) {
            return final;
        }

        if (heroes.partitioned === false) {
            const heroesArr = [];
            for (let i = 0; i < heroes.pool.length; i += 1) {
                heroesArr.push(`npc_dota_hero_${heroes.pool[i].name}`);
            }
            for (let i = 0; i < config.lua.poolNames.length; i += 1) {
                final.push('');
                final[i] = LuaCodeGenerator
                    .createLuaTable(config.lua.poolNames[i], heroesArr, true);
            }
        } else {
            const tempArr = [];
            const numPools = config.lua.poolNames.length;
            for (let i = 0; i < numPools; i += 1) {
                tempArr.push([]);
            }
            for (let i = 0; i < heroes.pool.length; i += 1) {
                const hero = heroes.pool[i];
                tempArr[(hero.position - 1 + numPools) % numPools].push(`npc_dota_hero_${hero.name}`);
            }
            for (let i = 0; i < numPools; i += 1) {
                final[i] = LuaCodeGenerator
                    .createLuaTable(config.lua.poolNames[i], tempArr[i], true);
            }
        }
        return final;
    }

    /**
     * This function generates the code to be placed in hero_selection.lua
     */
    static generateHeroSelectionFileContent(heroes) {
        const heroPools = this.generateHeroesCode(heroes);
        const filename = 'hero_selection.lua';
        let fileContents = fs.readFileSync(path.join(PATH_TO_TEMPLATE_SCRIPTS, HERO_SELECT_TEMPLATE_FOLDER_NAME, filename), 'utf8', (err) => {
            if (err) throw err;
        });
        let replaceStr = '';
        for (let i = 0; i < heroPools.length; i += 1) {
            replaceStr += `${heroPools[i]}${NEW_LINE}`;
        }
        fileContents = fileContents.replace('{{- pos-pool-heroes -}}', replaceStr);
        return fileContents;
    }
}
module.exports.HeroCodeGenerator = HeroCodeGenerator;
