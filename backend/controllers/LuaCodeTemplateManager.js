/**
 *  This class extends LuaCodeManager with a has relationship.
 *  This class uses the code templates in the static directory
 *  to generate the code a directory specified
 *
 *  TO DO: Get Lua Code Manager to not copy team_desires.lua
 *         or to get the copy the files synchronously, archive
 *         them synchronously.
 *
 * */

const path = require('path');

process.env.NODE_PATH = path.join(__dirname, '..');
require('module').Module._initPaths();
// const { writeScripts, shouldRegenerateBotScripts } = require('./generateScript.js');


const LEFT = 1;
const RIGHT = 2;
// const fs = require('fs');
const fs = require('fs-extra');
const copyFileSync = require('fs-copy-file-sync');
// const path = require('path');
const config = require('../../config/config.js');
const LuaCodeManager = require('./LuaCodeManager.js');

// Note: this relative to root dir
const PATH_TO_SCRIPTS = path.join(__dirname, '..', 'static', 'scripts');
const PATH_TO_TEMPLATE_SCRIPTS = path.join(__dirname, '..', 'static', 'codeTemplates');
const ABILITY_TEMPLATE_FOLDER_NAME = 'abilityTemplates';
const ITEM_TEMPLATE_FOLDER_NAME = 'itemTemplates';
const HERO_SELECT_TEMPLATE_FOLDER_NAME = 'heroSelectionTemplate';
const NEW_LINE = '\n';
const TAB = '\t';

const LuaCodeTemplateManager = function () {
    this.pathToStoreCode = path.join('backend', 'static', 'code_generators', 'code_dump');

    // extending lua code manager (LCM) without explicit inheritance
    this.lcm = new LuaCodeManager();

    // LCM functions
    this.addScriptHeading = function (headingName, luaString) {
        this.lcm.addScriptHeading(headingName, luaString);
    };

    this.addHelperFunction = function (functionName) {
        this.lcm.addHelperFunction(functionName);
    };

    this.addToAPIFunction = function (functionName, luaString) {
        this.lcm.addToAPIFunction(functionName, luaString);
    };

    this.addToStartAPIFunction = function (functionName, luaString) {
        this.lcm.addToStartAPIFunction(functionName, luaString);
    };

    this.addToEndAPIFunction = function (functionName, luaString) {
        this.lcm.addToEndAPIFunction(functionName, luaString);
    };

    this.checkAPIExistence = function (functionName) {
        this.lcm.checkAPIExistence(functionName);
    };

    this.generate = function () {
        return this.lcm.generate();
    };

    this.reset = function () {
        this.lcm.reset();
    };

    this.setPath = function (pathToFolder) {
        this.pathToStoreCode = pathToFolder;
    };

    // Helper functions
    this.createLuaFunction = function (indentString, content) {
        let code = '';
        code += `${indentString} function()`;
        for (let i = 0; i < content.length; i += 1) {
            code += `${indentString}${TAB}${content[i]}`;
        }
        code += `${indentString} end`;
        return code;
    };

    this.createLuaTable = function (variableName, array, quoted) {
        let code = `local ${variableName} ={${NEW_LINE}`;
        for (let i = 0; i < array.length; i += 1) {
            if (quoted === true) {
                code += `${TAB}"${array[i]}",${NEW_LINE}`;
            } else {
                code += `${TAB}${array[i]},${NEW_LINE}`;
            }
        }
        code += `}${NEW_LINE}`;
        return code;
    };

    /**
     *  Given a character, returns a string which contains the code to select the ability
     *  to level up according the bot script specification
     */
    this.generateAbilityCode = function (characterCode) {
        switch (characterCode) {
            case 'q': return 'Abilities[1]';
            case 'w': return 'Abilities[2]';
            case 'e': return 'Abilities[3]';
            case 'r': return 'Abilities[4]';
            case 't': return '"talent"';
            case 'n': return '"nil"';
            default: return '';
        }
    };

    /**
     *  Given a string such as 'qweqqr', returns an array of strings containing the appropriate
     *  code for the abilities as specified by generateAbilityCode in that order
     */
    this.generateAbilityArray = function (str) {
        const abilities = [];
        for (let i = 0; i < str.length; i += 1) {
            abilities[i] = this.generateAbilityCode(str[i]);
        }
        return abilities;
    };

    /**
     *  Given an array of size 4 such as ['l','r','l','l'],
     *  returns a string which contains the code to select the specified
     *  talents up according the bot script specification
     */
    this.generateTalentCode = function (talents) {
        let level = 0;
        let code = '';
        if (talents) {
            code += 'local TalentTree={';
            for (let i = 0; i < talents.length; i += 1) {
                let talentIndex;
                if (talents[i] === 'l') {
                    talentIndex = level + LEFT;
                } else {
                    talentIndex = level + RIGHT;
                }
                const content = this.createLuaFunction(`${NEW_LINE}${TAB}`, [`return Talents[${talentIndex}]`]);
                code += `${content},`;
                level += 2;
            }
            code += `${NEW_LINE}}`;
        }
        return code;
    };

    /**
     *  Given a string such as 'qweqqr', returns the string which
     *  contains the appropriate code for the abilities by using generateTalentCode
     *  to generate the code
     */
    this.generateLevelingAbilityCode = function (str) {
        const abilityArray = this.generateAbilityArray(str);
        const code = this.createLuaTable('AbilityToLevelUp', abilityArray, false);
        return code;
    };

    /**
     *  This creates the file content (ability_item_usage) which specifies
     *  which abilities a bot should get using the original bot script file as a
     *  template only replacing the relevant code
     *
     *  This expects the hero name and an object
     *  const input = {
     *    abilities: 'qweqqrewqetnqrnt', talents: ['l','r','l','l']
     *  };
     */
    this.generateAbilityFileContent = function (hero, abilityObject) {
        const filename = `ability_item_usage_${hero}_template.lua`;
        let fileContents = fs.readFileSync(path.join(PATH_TO_TEMPLATE_SCRIPTS, ABILITY_TEMPLATE_FOLDER_NAME, filename), 'utf8', (err) => {
            if (err) throw err;
        });
        const abilities = this.generateLevelingAbilityCode(abilityObject.abilities);
        const talents = this.generateTalentCode(abilityObject.talents);
        fileContents = fileContents.replace('{{- abilities-to-level -}}', `${abilities}${NEW_LINE}${NEW_LINE}${talents}${NEW_LINE}`);
        return fileContents;
    };

    /**
     *  This recursive function accepts an array of 'item' objects and decomposes
     *  it into an array of item name strings where the deepest component
     *  items appear first followed by their parent item.
     *
     *  @example
     *   [{
     *      name: 'dagon_1',
     *      components: [
     *          {
     *              name: 'staff_of_wizardry',
     *              components: [],
     *          },
     *          {
     *              name: 'null_talisman',
     *              components: [
     *
     *                  {
     *                      name: 'mantle',
     *                      components: [],
     *                  },
     *                  {
     *                      name: 'circlet',
     *                      components: [],
     *                  },
     *                  {
     *                      name: 'recipe',
     *                      components: [],
     *                  },
     *              ],
     *          },
     *      ]
     * }]
     *
     * becomes ['mantle' circlet', 'recipe', 'staff_of_wizardry' ,'dagon_1']
     */
    this.getComponentAsArray = function (item) {
        // no item, no array
        if (!item) {
            return [];
        }
        // base case, has no components
        if (!item.components) {
            return [item.name];
        }
        const components = [];
        item.components.forEach((element) => {
            const arr = this.getComponentAsArray(element);
            arr.forEach((tempElement) => {
                components.push(tempElement);
            });
        });
        components.push(item.name);
        return components;
    };

    /**
     *  Generates final LUA code snippet to be inserted into the template file
     *  as string, specifying which items the bot must get
     *  and in what order
     */
    this.generateItemCodeFromArray = function (itemArray) {
        const code = this.createLuaTable('ItemsToBuy', itemArray, true);
        return code;
    };

    /**
     *  This function expects items as an array of objects as the following
     * {
     *      name: 'api_name',
     *      components: [
     *          {
     *              name: 'other_name',
     *              components: [],
     *          },
     *          {
     *              name: 'other_recipe',
     *              components: [
     *
     *                  {
     *                  name: 'other_item_name',
     *                  components: [],
     *                  },
     *              ],
     *          },
     *      ]
     * }
     *
     *  And traverse the list of components in a depth first
     *  manner such that all components are arranged in a
     *  a single 1-D array
     *
     */
    this.generateItemCode = function (itemsArray) {
        // const arr = [];
        let arr = [];
        for (let i = 0; i < itemsArray.length; i += 1) {
            const items = this.getComponentAsArray(itemsArray[i]);
            // fancy way to join arrays
            arr = items.reduce((col, item) => {
                col.push(item);
                return col;
            }, arr);
        }
        return this.generateItemCodeFromArray(arr);
    };

    /**
     * This generates the item_purchase file using the template code
     * to ensure that all valid code is present while the newly generated code
     * is added.
     *
     * This this.expects a hero name and the array of items (note: the items must
     * be in the form accepted by the dota bot scripting API e.g. "item_recipe_dagon")
     */
    this.generateItemFileContent = function (hero, itemArray) {
        const filename = `item_purchase_${hero}_template.lua`;
        let fileContents = fs.readFileSync(path.join(PATH_TO_TEMPLATE_SCRIPTS, ITEM_TEMPLATE_FOLDER_NAME, filename), 'utf8', (err) => {
            if (err) throw err;
        });
        const contents = this.generateItemCode(itemArray);
        fileContents = fileContents.replace('{{- items-to-buy -}}', `${contents}${NEW_LINE}`);
        return fileContents;
    };

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
    this.generateHeroesCode = function (heroes) {
        const final = [];
        // return if hero object not proper not
        if (!heroes.pool) {
            return final;
        }

        if (heroes.partitioned === false) {
            const heroesArr = [];
            for (let i = 0; i < heroes.pool.length; i += 1) {
                heroesArr.push(heroes.pool[i].name);
            }
            for (let i = 0; i < config.lua.poolNames.length; i += 1) {
                final.push('');
                final[i] = this.createLuaTable(config.lua.poolNames[i], heroesArr, true);
            }
        } else {
            const tempArr = [];
            const numPools = config.lua.poolNames.length;
            for (let i = 0; i < numPools; i += 1) {
                tempArr.push([]);
            }
            for (let i = 0; i < heroes.pool.length; i += 1) {
                const hero = heroes.pool[i];
                tempArr[(hero.position - 1) % numPools].push(hero.name);
            }
            for (let i = 0; i < numPools; i += 1) {
                final[i] = this.createLuaTable(config.lua.poolNames[i], tempArr[i], true);
            }
        }
        return final;
    };


    /**
     * This function generates the code to be placed in hero_selection.lua
     */
    this.generateHeroSelectionFileContent = function (heroes) {
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
    };

    // Generating of physical files

    /**
     *  This this.creates the file (ability_item_usage) which specifies which abilities
     *  a bot should get using the original bot script file as a template
     *  only replacing the relevant code
     */
    this.generateAbilityUsageFile = function (hero, abilityObject) {
        const content = this.generateAbilityFileContent(hero, abilityObject);
        const filename = `ability_item_usage_${hero}.lua`;
        const pathToFile = path.join(this.pathToStoreCode, filename);
        fs.writeFileSync(pathToFile, content, (err) => {
            if (err) throw err;
        });
    };

    this.generateItemFile = function (hero, itemArray) {
        const filename = `item_purchase_${hero}.lua`;
        const content = this.generateItemFileContent(hero, itemArray);
        const pathToFile = path.join(this.pathToStoreCode, filename);
        fs.writeFileSync(pathToFile, content, (err) => {
            if (err) throw err;
        });
    };

    /**
     * This this.generates the file to be used by hero_selection.lua
     */
    this.generateHeroesSelectionFile = function (heroes) {
        const final = this.generateHeroSelectionFileContent(heroes);
        const pathToFile = path.join(this.pathToStoreCode, 'hero_selection.lua');
        fs.writeFileSync(pathToFile, final, (err) => {
            if (err) throw err;
        });
    };

    /**
     *  Copies files at path specifed to destination path
     */
    this.copyFile = function (pathToFile, destinationPath) {
        copyFileSync(pathToFile, destinationPath);
    };

    /**
     *  Copies script (using the constants to the paths defined earlier)
     */
    this.copyScript = function (filename, destinationFilename) {
        const pathToScript = path.join(PATH_TO_SCRIPTS, filename);
        const destinationLocation = path.join(this.pathToStoreCode, destinationFilename);
        this.copyFile(pathToScript, destinationLocation);
    };

    this.copyAllFilesFromFolder = function (pathToScriptFolder) {
        const files = fs.readdirSync(pathToScriptFolder);
        for (let i = 0; i < files.length; i += 1) {
            if (files[i] !== 'team_desires.lua') {
                const pathFrom = path.join(pathToScriptFolder, files[i]);
                const pathTo = path.join(this.pathToStoreCode, files[i]);
                this.copyFile(pathFrom, pathTo);
            }
        }
    };

    /**
     *  The main method to be used to analyze the config object,
     *  It does all the error control
     */
    this.generateBotScripts = function (configObject, callback) {
        if (configObject.heroPool) {
            if (configObject.heroPool.pool.length === 0) {
                // if heroPool is an empty object, copy all scripts to the temp dir
                // so that all heroes are selected as a "default"
                this.copyAllFilesFromFolder(PATH_TO_SCRIPTS);
            } else {
                this.generateHeroesSelectionFile(configObject.heroPool);
                if (configObject.heroes) {
                    for (let i = 0; i < configObject.heroes.length; i += 1) {
                        const heroSpec = configObject.heroes[i];
                        const heroName = heroSpec.name;
                        if (heroSpec) {
                            if (heroSpec.abilities) {
                                this.generateAbilityUsageFile(heroName, heroSpec);
                            } else {
                                // include default bot ability file if abilities unspecified
                                const filename = `ability_item_usage_${heroName}.lua`;
                                this.copyScript(filename, filename);
                            }
                            if (heroSpec.items) {
                                this.generateItemFile(heroName, heroSpec.items);
                            } else {
                                // include default bot item file if items unspecified
                                const filename = `item_purchase_${heroName}.lua`;
                                this.copyScript(filename, filename);
                            }
                        } else {
                            // include all default bot files for that hero
                            let filename = `item_purchase_${heroName}.lua`;
                            this.copyScript(filename, filename);
                            filename = `ability_item_usage_${heroName}.lua`;
                            this.copyScript(filename, filename);
                        }
                        // including any bot_${heroName}.lua files if they exist
                        // since they override a lot of the normal bot logic
                        const filename = `bot_${heroName}.lua`;
                        const pathToScript = path.join(__dirname, '..', 'static', 'scripts', filename);
                        if (fs.existsSync(pathToScript)) {
                            this.copyFile(pathToScript, path.join(this.pathToStoreCode, filename));
                        }
                    }
                } else if (configObject.heroPool.pool) {
                    for (let i = 0; i < configObject.heroPool.pool.length; i += 1) {
                        const heroName = configObject.heroPool.pool[i].name;
                        let filename = `item_purchase_${heroName}.lua`;
                        this.copyScript(filename, filename);
                        filename = `ability_item_usage_${heroName}.lua`;
                        this.copyScript(filename, filename);
                        filename = `bot_${heroName}.lua`;
                        const pathToScript = path.join(PATH_TO_SCRIPTS, filename);
                        if (fs.existsSync(pathToScript)) {
                            this.copyFile(pathToScript, path.join(this.pathToStoreCode, filename));
                        }
                    }
                }
            }
            // include all essential files
            for (let i = 0; i < config.lua.essentialFilesToInclude.length; i += 1) {
                const filename = config.lua.essentialFilesToInclude[i];
                this.copyScript(filename, filename);
            }
        } else {
            // if no hero options specified, give the user all the scripts
            this.copyAllFilesFromFolder(PATH_TO_SCRIPTS);
        }
        if (typeof callback === 'function') {
            callback();
        }
    };
};

const codeGenerator = new LuaCodeTemplateManager();
module.exports.codeGenerator = codeGenerator;

