const path = require('path');
const fs = require('fs-extra');
const { LuaCodeGenerator } = require('./LuaCodeGenerator.js');

const PATH_TO_TEMPLATE_SCRIPTS = path.join(__dirname, '..', '..', 'static', 'codeTemplates');
const ABILITY_TEMPLATE_FOLDER_NAME = 'abilityTemplates';
const NEW_LINE = LuaCodeGenerator.getNewLine();
const TAB = LuaCodeGenerator.getTab();
const LEFT = 1;
const RIGHT = 2;

class AbilityCodeGenerator {
    /**
     *  Given a character, returns a string which contains the code to select the ability
     *  to level up according the bot script specification
     */
    static generateAbilityCode(characterCode) {
        switch (characterCode) {
            case 'q': return 'Abilities[1]';
            case 'w': return 'Abilities[2]';
            case 'e': return 'Abilities[3]';
            case 'r': return 'Abilities[4]';
            case 't': return '"talent"';
            case 'n': return '"nil"';
            default: return '';
        }
    }

    /**
     *  Given a string such as 'qweqqr', returns an array of strings containing the appropriate
     *  code for the abilities as specified by generateAbilityCode in that order
     */
    static generateAbilityArray(str) {
        const abilities = [];
        for (let i = 0; i < str.length; i += 1) {
            abilities[i] = this.generateAbilityCode(str[i]);
        }
        return abilities;
    }

    /**
     *  Given an array of size 4 such as ['l','r','l','l'],
     *  returns a string which contains the code to select the specified
     *  talents up according the bot script specification
     */
    static generateTalentCode(talents) {
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
                const content = LuaCodeGenerator.createLuaFunction(`${NEW_LINE}${TAB}`, [`return Talents[${talentIndex}]`]);
                code += `${content},`;
                level += 2;
            }
            code += `${NEW_LINE}}`;
        }
        return code;
    }

    /**
     *  Given a string such as 'qweqqr', returns the string which
     *  contains the appropriate code for the abilities by using generateTalentCode
     *  to generate the code
     */
    static generateLevelingAbilityCode(str) {
        const abilityArray = this.generateAbilityArray(str);
        const code = LuaCodeGenerator.createLuaTable('AbilityToLevelUp', abilityArray, false);
        return code;
    }

    /**
     *  This creates the file content (ability_item_usage) which specifies
     *  which abilities a bot should get using the original bot script file as a
     *  template only replacing the relevant code
     *
     *  This expects the hero name and an object
     *  const input = {
     *    abilities: 'qweqqrewqetnqrnt', talents: ['l','r','l','l']
     *  }
     */
    static generateAbilityFileContent(hero, abilityObject) {
        const filename = `ability_item_usage_${hero}_template.lua`;
        let fileContents = fs.readFileSync(path.join(PATH_TO_TEMPLATE_SCRIPTS, ABILITY_TEMPLATE_FOLDER_NAME, filename), 'utf8', (err) => {
            if (err) throw err;
        });
        const abilities = this.generateLevelingAbilityCode(abilityObject.abilities);
        const talents = this.generateTalentCode(abilityObject.talents);
        fileContents = fileContents.replace('{{- abilities-to-level -}}', `${abilities}${NEW_LINE}${NEW_LINE}${talents}${NEW_LINE}`);
        return fileContents;
    }
}
module.exports.AbilityCodeGenerator = AbilityCodeGenerator;
