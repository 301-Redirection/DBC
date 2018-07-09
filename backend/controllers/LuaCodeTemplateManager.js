const LEFT = 1;
const RIGHT = 2;
// const fs = require('fs');
const fs = require('fs-extra');
const path = require('path');
const config = require('../../config/config.js');
const LuaCodeManager = require('./LuaCodeManager.js');

// Note: this relative to root dir
const PATH_TO_SCRIPTS = path.join('backend', 'static', 'scripts');
const PATH_TO_TEMPLATE_SCRIPTS = path.join('backend', 'static', 'code_templates');
const ABILITY_TEMPLATE_FOLDER_NAME = 'ability_templates';
const ITEM_TEMPLATE_FOLDER_NAME = 'item_templates';
const HERO_SELECT_TEMPLATE_FOLDER_NAME = 'hero_selection_template';
const NEW_LINE = '\r\n';
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
        let code = `local ${variableName} ={\n`;
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
        let code = 'local TalentTree={';
        for (let i = 0; i < talents.length; i += 1) {
            let talentIndex;
            if (talents[i] === 'l') {
                talentIndex = level + LEFT;
            } else {
                talentIndex = level + RIGHT;
            }
            code += this.createLuaFunction('\n\t', [`return Talents[${talentIndex}]`]) + ',';
            level += 2;
        }
        code += '\n}';
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
     *  This this.creates the file content (ability_item_usage) which specifies
     *  which abilities a bot should get using the original bot script file as a
     *  template only replacing the relevant code
     *
     *  This this.expects the hero name and an object
     *  const input = {
     *    abilities: 'qweqqrewqetnqrnt', talents: ['l','r','l','l']
     *  };
     */
    this.generateAbilityFileContent = function (hero, abilityObject) {
        const filename = `ability_item_usage_${hero}_template.lua`;
        let fileContents = fs.readFileSync(path.join(PATH_TO_TEMPLATE_SCRIPTS, ABILITY_TEMPLATE_FOLDER_NAME, filename), 'utf8', (err) => {
            if (err) throw err;
        });
        fileContents = fileContents.replace('{{- abilities-to-level -}}', `${this.generateLevelingAbilityCode(abilityObject.abilities)}\r\n\r\n${this.generateTalentCode(abilityObject.talents)}\r\n`);
        return fileContents;
    };

    /**
     *  This this.creates the file (ability_item_usage) which specifies which abilities
     *  a bot should get using the original bot script file as a template
     *  only replacing the relevant code
     */
    this.generateAbilityUsageFile = function (hero, abilityObject) {
        const content = this.generateAbilityFileContent(hero, abilityObject);
        const filename = `ability_item_usage_${hero}.lua`;
        const pathToFile = path.join(this.pathToStoreCode, filename);
        fs.writeFile(pathToFile, content, (err) => {
            if (err) throw err;
        });
    };

    /**
     * This generates the item_purchase file content as string,
     * specifying which items the bot must get and in what order
     *
     */
    this.generateItemCode = function (itemArray) {
        const code = this.createLuaTable('ItemsToBuy', itemArray, true);
        return code;
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
        fileContents = fileContents.replace('{{- items-to-buy -}}', `${this.generateItemCode(itemArray)}\r\n`);
        return fileContents;
    };

    this.generateItemFile = function (hero, itemArray) {
        const filename = `item_purchase_${hero}.lua`;
        const content = this.generateItemFileContent(hero, itemArray);
        const pathToFile = path.join(this.pathToStoreCode, filename);
        fs.writeFile(pathToFile, content, (err) => {
            if (err) throw err;
        });
    };

    // ///////////////////////////////////////////////////////////////////////

    /**
     * This function generates the code to be used by hero_selection.lua
     */
    this.generateHeroesCode = function (heroes) {
        const final = [];
        if (heroes.partitioned === 'false') {
            for (let i = 0; i < config.lua.poolNames.length; i += 1) {
                final.push('');
                final[i] = this.createLuaTable(config.lua.poolNames[i], heroes.pool, true);
            }
        } else {
            for (let i = 0; i < config.lua.poolNames.length; i += 1) {
                final.push('');
                final[i] = this.createLuaTable(config.lua.poolNames[i], heroes.pool[i], true);
            }
        }
        // console.log(final)
        return final;
    };

    /**
     * This generates the content of the hero_selection.lua
     *
     * This this.expects an object like the following
     *
     *  const heroes1 = {
     *       partitioned: 'false',
     *       pool: [
     *               'drow_ranger',
     *               'bane',
     *               'alchemist',
     *               'abaddon',
     *               'antimage',
     *               'axe',
     *               'bloodseeker',
     *               'centaur',
     *               'chen',
     *               'chaos_knight',
     *               'crystal_maiden',
     *       ],
     *   };
     *  ^ for all heroes equally likely to be picked
     *
     * const heroes2 = {
     *       partitioned: 'true',
     *       pool: [
     *           [
     *               'drow_ranger',
     *               'bane',
     *               'alchemist',
     *           ],
     *           [
     *               'abaddon',
     *               'antimage',
     *           ],
     *           [
     *               'axe',
     *               'bloodseeker',
     *           ],
     *           [
     *               'centaur',
     *               'chen',
     *           ],
     *           [
     *               'chaos_knight',
     *               'crystal_maiden',
     *           ],
     *       ]
     *   };
     * ^ so that one bot picks one hero from each of the pools
     *
     * This this.uses the static bot script as a template
     *
     */
    this.generateHeroSelectionFileContent = function (heroes) {
        const heroPools = this.generateHeroesCode(heroes);
        const filename = 'hero_selection.lua';
        let fileContents = fs.readFileSync(path.join(PATH_TO_TEMPLATE_SCRIPTS, HERO_SELECT_TEMPLATE_FOLDER_NAME, filename), 'utf8', (err) => {
            if (err) throw err;
        });
        let replaceStr = '';
        for (let i = 0; i < heroPools.length; i += 1) {
            replaceStr += `${heroPools[i]}\r\n`;
        }
        fileContents = fileContents.replace('{{- pos-pool-heroes -}}', replaceStr);
        return fileContents;
    };

    /**
     * This this.generates the file to be used by hero_selection.lua
     */
    this.generateHeroesSelectionFile = function (heroes) {
        const final = this.generateHeroSelectionFileContent(heroes);
        const pathToFile = path.join(this.pathToStoreCode, 'hero_selection.lua');
        fs.writeFile(pathToFile, final, (err) => {
            if (err) throw err;
        });
    };

    /**
     *  This function will return an array of heroes given the heroPool object of the 
     *  config, if there are any errors, an array of size 0 will be returned
     */
    this.getHeroesArray = function (heroObject) {
        let allHeroes = [];
        if (typeof heroObject.partitioned !== 'undefined' && heroObject.partitioned) {
            if (heroObject.partitioned === 'false') {
                if (typeof heroObject.pool !== 'undefined' && heroObject.pool) {
                    allHeroes = heroObject.pool;
                }
            } else {
                for (let i = 0; i < config.lua.poolNames.length; i += 1) {
                    if (typeof heroObject.pool[i] !== 'undefined' && heroObject.pool[i]) {
                        const arr = heroObject.pool[i];
                        for (let j = 0; j < arr.length; j += 1) {
                            allHeroes.push(arr[j]);
                        }
                    }
                }
            }
        }
        return allHeroes;
    };

    /**
     *  Copies files at path specifed to destination path
     */
    this.copyFile = function (pathToFile, destinationPath) {
        fs.createReadStream(pathToFile)
            .pipe(fs.createWriteStream(destinationPath));
    };

    /**
     *  Copies script (using the constants to the paths defined earlier)
     */
    this.copyScript = function (filename, destinationFilename) {
        const pathToScript = path.join(PATH_TO_SCRIPTS, filename);
        const destinationLocation = path.join(this.pathToStoreCode, destinationFilename);
        this.copyFile(pathToScript, destinationLocation);
    };

    /**
     *  The main method to be used to analyze the config object,
     *  It does all the error control 
     */
    this.generateBotScripts = function (configObject) {

        if (typeof configObject.heroPool !== 'undefined' && configObject.heroPool) {

            const allSelectedHeroes = this.getHeroesArray(configObject.heroPool);
            if (allSelectedHeroes.length === 0) {
                // if heroPool is an empty object, copy all scripts to the temp dir
                // so that all heroes are selected as a "default"
                fs.copy(PATH_TO_SCRIPTS, this.pathToStoreCode, (err) => {
                    if (err) throw err;
                });
            }
            else {
                this.generateHeroesSelectionFile(configObject.heroPool);
                for (let i = 0; i < allSelectedHeroes.length; i += 1) {
                    if (typeof configObject.heroes !== 'undefined' && configObject.heroes) {
                        const heroSpecification = configObject.heroes[allSelectedHeroes[i]];
                        const heroName = allSelectedHeroes[i];
                        if (typeof heroSpecification !== 'undefined' && heroSpecification) {
                            if (typeof heroSpecification.abilities !== 'undefined' && heroSpecification.abilities) {
                                this.generateAbilityUsageFile(heroName, heroSpecification.abilities);
                            } else {
                                // include default bot ability file if abilities unspecified
                                const filename = `ability_item_usage_${heroName}.lua`;
                                this.copyScript(filename, filename);
                            }
                            if (typeof heroSpecification.items !== 'undefined' && heroSpecification.items) {
                                this.generateItemFile(heroName, heroSpecification.items);
                            } else {
                                // include default bot item file if items unspecified
                                const filename = `item_purchase_${heroName}.lua`;
                                this.copyScript(filename, filename);
                            }
                        } else {
                            // include all default bot files for that hero
                            let filename = `item_purchase_${heroName}.lua`;
                            let pathToScript = path.join(PATH_TO_SCRIPTS, filename);
                            let destinationLocation = path.join(this.pathToStoreCode, filename);
                            this.copyFile(pathToScript, destinationLocation);
                            filename = `ability_item_usage_${heroName}.lua`;
                            pathToScript = path.join(PATH_TO_SCRIPTS, filename);
                            destinationLocation = path.join(this.pathToStoreCode, filename);
                            this.copyFile(pathToScript, destinationLocation);
                        }
                        // including any bot_${heroName}.lua files if they exist
                        // since they override a lot of the normal bot logic
                        const filename = `bot_${heroName}.lua`;
                        const pathToScript = path.join(__dirname, '..', 'static', 'scripts', filename);
                        if (fs.existsSync(pathToScript)) {
                            this.copyFile(pathToScript, path.join(this.pathToStoreCode, filename));
                        }
                    }
                    else {
                        return res
                        // throw 'No heroes array specified. Invalid Configuration';
                    }
                }
            }

        }
        else {
            throw new Error('heroPool object is absent from configuration');
        }
        
        // include all essential files
        for (let i = 0; i < config.lua.essentialFilesToInclude.length; i += 1) {
            const filename = config.lua.essentialFilesToInclude[i];
            this.copyScript(filename, filename);
        }
    };
};

const codeGenerator = new LuaCodeTemplateManager();
module.exports.codeGenerator = codeGenerator;

