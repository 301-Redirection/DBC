const LEFT = 1;
const RIGHT = 2;
const fs = require('fs');
const path = require('path');

// Note: this relative to root dir
const PATH_TO_CODE_DUMP = path.join('backend', 'static', 'code_generators', 'code_dump');
const PATH_TO_SCRIPTS = path.join('backend', 'static', 'scripts');
const PATH_TO_TEMPLATE_SCRIPTS = path.join('backend', 'static', 'scripts', 'code_templates');
const ABILITY_TEMPLATE_FOLDER_NAME = 'ability_templates';
const ITEM_TEMPLATE_FOLDER_NAME = 'item_templates';
const HERO_SELECT_TEMPLATE_FOLDER_NAME = 'hero_selection_template';

const TemplateBasedGenerator = function () {
    this.essentialFilesToInclude = [
        'BotNameUtility.lua',
        'mode_attack_spirit_breaker.lua',
        'mode_laning_generic.lua',
        'mode_push_tower_mid_generic.lua',
        'mode_push_tower_top_generic.lua',
        'mode_push_tower_bot_generic.lua',
        'mode_roam_spirit_breaker.lua',
        'mode_rune_generic.lua',
        'mode_secret_shop_generic.lua',
        'mode_side_shop_generic.lua',
        'mode_side_shop_enigma.lua',
        'mode_side_shop_keeper_of_the_light.lua',
        'mode_side_shop_shadow_shaman.lua',
        'mode_side_shop_windrunner.lua',
        'mode_team_roam_generic.lua',
        'mode_ward_generic.lua',
        'MinionUtility.lua',
        'NewMinionUtil.lua',
        'PushUtility.lua',
        'RoleUtility.lua',
        'utility.lua',
        'WardUtility.lua',
    ];

    this.poolNames = [
        'hero_pool_position_1',
        'hero_pool_position_2',
        'hero_pool_position_3',
        'hero_pool_position_4',
        'hero_pool_position_5',
    ];

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
            case 't': return 'talent';
            case 'n': return 'nil';
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
            code += '\n\tfunction()';
            code += `\n\t\treturn Talents[${talentIndex}]`;
            code += '\n\tend';
            level += 2;
        }
        code += '\nend';
        code += '\n}';
        return code;
    };

    /**
     *  Given a string such as 'qweqqr', returns the string which
     *  contains the appropriate code for the abilities by using generateTalentCode
     *  to generate the code
     */
    this.generateLevelingAbilityCode = function (str) {
        let code = 'local AbilityToLevelUp=\n{';
        const arr = this.generateAbilityArray(str);
        for (let i = 0; i < arr.length; i += 1) {
            code += `\t${arr[i]},\n`;
        }
        code += '}';
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
        const pathToFile = path.join(PATH_TO_CODE_DUMP, filename);
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
        let code = 'local ItemsToBuy = \n{';
        for (let i = 0; i < itemArray.length; i += 1) {
            code += `\n\t'${itemArray[i]}',`;
        }
        code += '\n}';
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
        const pathToFile = path.join(PATH_TO_CODE_DUMP, filename);
        fs.writeFile(pathToFile, content, (err) => {
            if (err) throw err;
        });
    };

    // ///////////////////////////////////////////////////////////////////////

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
     *       pool1: [
     *           'drow_ranger',
     *           'bane',
     *           'alchemist',
     *       ],
     *       pool2: [
     *           'abaddon',
     *           'antimage',
     *       ],
     *       pool3: [
     *           'axe',
     *           'bloodseeker',
     *       ],
     *       pool4: [
     *           'centaur',
     *           'chen',
     *       ],
     *       pool5: [
     *           'chaos_knight',
     *           'crystal_maiden',
     *       ],
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
     * This this.generates the code to be used by hero_selection.lua
     */
    this.generateHeroesCode = function (heroes) {
        const final = [];
        if (heroes.partitioned === 'false') {
            for (let i = 0; i < this.poolNames.length; i += 1) {
                final.push('');
                final[i] += (`${this.poolNames[i]}={\r\n`);
                for (let j = 0; j < heroes.pool.length; j += 1) {
                    final[i] += (`\t"${heroes.pool[j]}",\r\n`);
                }
                final[i] += '}\r\n\r\n';
            }
        } else {
            for (let i = 0; i < this.poolNames.length; i += 1) {
                final.push('');
                final[i] += (`${this.poolNames[i]}={\r\n`);
                let arr = heroes.pool[i];
                for (let j = 0; j < arr.length; j += 1) {
                    final[i] += (`\t"${arr[j]}",\r\n`);
                }
                final[i] += '}\r\n\r\n';
            }
        }
        // console.log(final)
        return final;
    };

    /**
     * This this.generates the file to be used by hero_selection.lua
     */
    this.generateHeroesSelectionFile = function (heroes) {
        const final = this.generateHeroSelectionFileContent(heroes);
        const pathToFile = path.join(PATH_TO_CODE_DUMP, 'hero_selection.lua');
        fs.writeFile(pathToFile, final, (err) => {
            if (err) throw err;
        });
    };

    this.getHeroesArray = function (heroObject) {
        let allHeroes = [];
        if (heroObject.partitioned === 'false') {
            allHeroes = heroObject.pool;
        } else {
            for (let i = 0; i < this.poolNames.length; i += 1) {
                let arr = heroObject.pool[i];
                for (let j = 0; j < arr.length; j += 1) {
                    allHeroes.push(arr[j]);
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
        const destinationLocation = path.join(PATH_TO_CODE_DUMP, destinationFilename);
        this.copyFile(pathToScript, destinationLocation);
    };


    this.generateBotScripts = function (configObject) {
        this.generateHeroesSelectionFile(configObject.heroes);
        const allHeroes = this.getHeroesArray(configObject.heroes);
        // console.log(allHeroes);
        for (let i = 0; i < allHeroes.length; i += 1) {
            const hero = configObject[allHeroes[i]];
            const heroName = allHeroes[i];
            if (hero !== undefined) {
                if (hero.abilities !== undefined) {
                    this.generateAbilityUsageFile(heroName, hero.abilities);
                    // console.log(`Just generated ${heroName} ability script`);
                } else {
                    // include default bot ability file
                    const filename = `ability_item_usage_${heroName}.lua`;
                    this.copyScript(filename, filename);
                    // console.log(`Just copied ${heroName} ability script`);
                }
                if (hero.items !== undefined) {
                    this.generateItemFile(heroName, hero.items);
                    // console.log(`Just generated ${heroName} item script`);
                } else {
                    // include default bot item file
                    const filename = `item_purchase_${heroName}.lua`;
                    this.copyScript(filename, filename);
                    // console.log(`Just copied ${heroName} item script`);
                }
            } else {
                // include default bot files
                let filename = `item_purchase_${heroName}.lua`;
                let pathToScript = path.join(PATH_TO_SCRIPTS, filename);
                let destinationLocation = path.join(PATH_TO_CODE_DUMP, filename);
                this.copyFile(pathToScript, destinationLocation);
                filename = `ability_item_usage_${heroName}.lua`;
                pathToScript = path.join(PATH_TO_SCRIPTS, filename);
                destinationLocation = path.join(PATH_TO_CODE_DUMP, filename);
                this.copyFile(pathToScript, destinationLocation);
            }
            // including any bot_${heroName}.lua files if they exist
            const filename = `bot_${heroName}.lua`;
            const pathToScript = path.join(__dirname, '..', 'scripts', filename);
            if (fs.existsSync(pathToScript)) {
                this.copyFile(pathToScript, path.join(PATH_TO_CODE_DUMP, filename));
            }
        }
        // include all essential files
        for (let i = 0; i < this.essentialFilesToInclude.length; i += 1) {
            const filename = this.essentialFilesToInclude[i];
            this.copyScript(filename, filename);
        }
    };
};

const templateGenerator = new TemplateBasedGenerator();
module.exports.templateGenerator = templateGenerator;
