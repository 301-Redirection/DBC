/**
* Expected input: JSON Object { abilities: "qweqqrewqet", talents: ['l','r','l','l']}
*
*   q, w, e, r refer to the ability bound keys t refers to an appropriate talent
*   l,r refer to left and right for the talent tree
*/
const LEFT = 1;
const RIGHT = 2;

let fs = require('fs');
let path = require('path');

const items = ['item_slippers',
                'item_circlet',
                'item_recipe_wraith_band',
                'item_tango'];

const hero = 'drow_ranger';
const input = {
    abilities: 'qweqqrewqetnqrnt', talents: ['l','r','l','l']
};

fs = require('fs');
let fileContents = fs.readFileSync(path.join('backend','static','scripts',`ability_item_usage_${hero}.lua`), 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
});
console.log(getAbilityToLevelUp(input.abilities));
console.log(getTalentCode(input.talents));
console.log(getItemCode(items));

function getAbilityToLevelUp(str) {
    let code = 'local AbilityToLevelUp=\n{';
    let arr = getArrayOfAbilities(str);
    for (var i = 0; i < arr.length; i+=1) {
        code += arr[i] + ',\n';
    }
    code += '}'
    return code;
}

function getArrayOfAbilities(str) {
    let abilities = [];
    for (var i = 0; i < str.length; i+=1) {
      abilities[i] = getAbilityCode(str[i]);
    }
    return abilities;
}

function getAbilityCode(char) {
    switch (char) {
        case 'q': return 'Abilities[1]';
        case 'w': return 'Abilities[2]';
        case 'e': return 'Abilities[3]';
        case 'r': return 'Abilities[4]';
        case 't': return 'talent';
        case 'n': return 'nil';
    }
    return '';
}

function getTalentCode(talents) {

    let level = 0;
    let code = 'local TalentTree={';
    for(let i = 0; i < talents.length; i+=1) {
        let talentIndex;
        if (talents[i] === 'l') {
            talentIndex = level + LEFT;
        }
        else {
            talentIndex = level + RIGHT;
        }
        code += '\n\tfunction()';
        code += `\n\t\treturn Talents[${talentIndex}]`;
        code += '\n\tend';
        level += 2;
    }
    code += '\nend';
    return code;
}

function getItemCode(items) {
    let code = 'local ItemsToBuy = \n{';
    for(let i = 0; i < items.length; i+=1) {
        code += '\n\t' + items[i] + ',';
    }
    code += '\n}';
    return code;
}