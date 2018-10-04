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
// process.env.NODE_PATH = path.join(__dirname, '..', '..');
// require('module').Module._initPaths();
// const { writeScripts, shouldRegenerateBotScripts } = require('./generateScript.js');

// const fs = require('fs');
const fs = require('fs-extra');
const copyFileSync = require('fs-copy-file-sync');
// const path = require('path');
const config = require('../../../config/config.js');
const LuaCodeManager = require('./LuaCodeManager.js');
const { ItemCodeGenerator } = require('./ItemCodeGenerator.js');
const { AbilityCodeGenerator } = require('./AbilityCodeGenerator.js');
const { HeroCodeGenerator } = require('./HeroCodeGenerator.js');

// Note: this relative to root dir
const PATH_TO_SCRIPTS = path.join(__dirname, '..', '..', 'static', 'scripts');

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

    // Generating of physical files
    /**
     *  This this.creates the file (ability_item_usage) which specifies which abilities
     *  a bot should get using the original bot script file as a template
     *  only replacing the relevant code
     */
    this.generateAbilityUsageFile = function (hero, abilityObject) {
        const content = AbilityCodeGenerator
            .generateAbilityFileContent(hero, abilityObject);
        const filename = `ability_item_usage_${hero}.lua`;
        const pathToFile = path.join(this.pathToStoreCode, filename);
        fs.writeFileSync(pathToFile, content, (err) => {
            if (err) throw err;
        });
    };

    /**
     * This generates a specific hero's item purchase file
     */
    this.generateItemFile = function (hero, itemArray) {
        try {
            const filename = `item_purchase_${hero}.lua`;
            const content = ItemCodeGenerator.generateItemFileContent(hero, itemArray);
            const pathToFile = path.join(this.pathToStoreCode, filename);
            fs.writeFileSync(pathToFile, content, (err) => {
                if (err) {
                    throw err;
                }
            });
        } catch (err) {
            throw err;
        }
    };

    /**
     * This generates the file to be used by hero_selection.lua
     */
    this.generateHeroesSelectionFile = function (heroes) {
        const final = HeroCodeGenerator.generateHeroSelectionFileContent(heroes);
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
                // if heroPool is an empty array, copy all scripts to the temp dir
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
