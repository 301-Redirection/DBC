const heroData = require('./heroData.js');
/** HELPER FUNCTIONS */
/** this function removes the first underscore in a string
  *  example: antimage_mana_break -> mana_break
  */
function refineStr(str) {
    if (!str) { return ''; }
    const firstUnderscoreIndex = str.indexOf('_');
    return str.slice(firstUnderscoreIndex + 1, str.length);
}
// accepts the hero specific object and builds roles json
function makeRoleObject(dataObject) {
    const roleStr = dataObject.Role;
    const roleLevels = dataObject.Rolelevels;
    const roleObject = { roles: [] };
    if (!roleStr) { return null; }
    if (!roleLevels) { return null; }
    const roles = roleStr.split(',');
    const roleLevelsArray = roleLevels.split(',');
    for (let i = roles.length - 1; i >= 0; i -= 1) {
        roleObject.roles.push({ name: roles[i], level: roleLevelsArray[i] });
    }
    return roleObject;
}
/** accepts the hero specific object and a boolean
  * the boolean indicates whether the string should have the
  * term before the first '_' removed.
  */
function makeAbilityObject(dataObject, shouldRefine) {
    if (!dataObject) { return null; }
    const main = {};
    for (let i = 1; i < 6; i += 1) {
        if (shouldRefine) {
            main.q = refineStr(dataObject.Ability1);
            main.w = refineStr(dataObject.Ability2);
            main.e = refineStr(dataObject.Ability3);
            main.r = refineStr(dataObject.Ability6);
            main.misc1 = refineStr(dataObject.Ability4);
            main.misc2 = refineStr(dataObject.Ability5);
        } else {
            main.q = dataObject.Ability1;
            main.w = dataObject.Ability2;
            main.e = dataObject.Ability3;
            main.r = dataObject.Ability6;
            main.misc1 = dataObject.Ability4;
            main.misc2 = dataObject.Ability5;
        }
    }
    // tree options
    const tree = {};
    for (let i = 10; i < 18; i += 1) {
        if (shouldRefine) {
            tree[`Tree_Ability${i}`] = refineStr(dataObject[`Ability${i}`]);
        } else {
            tree[`Tree_Ability${i}`] = dataObject[`Ability${i}`];
        }
    }
    return { abilities: { main, tree } };
}
// accepts hero specific object and builds the stats object
function makeHeroStatsObject(dataObject) {
    if (!dataObject) { return null; }
    const heroStats = {};
    const abilityObject = makeAbilityObject(dataObject, true);
    heroStats.abilities = JSON.stringify(abilityObject);
    heroStats.armor = dataObject.ArmorPhysical;
    heroStats.attackDamageMin = dataObject.AttackDamageMin;
    heroStats.attackDamageMax = dataObject.AttackDamageMax;
    heroStats.attackRate = dataObject.AttackRate;
    heroStats.attackRange = dataObject.AttackRange;
    heroStats.primaryAttribute = dataObject.AttributePrimary;
    heroStats.baseStrength = dataObject.AttributeBaseStrength;
    heroStats.baseStrengthGain = dataObject.AttributeStrengthGain;
    heroStats.baseAgility = dataObject.AttributeBaseAgility;
    heroStats.baseAgilityGain = dataObject.AttributeAgilityGain;
    heroStats.baseIntelligence = dataObject.AttributeBaseIntelligence;
    heroStats.baseIntelligenceGain = dataObject.AttributeIntelligenceGain;
    heroStats.movespeed = dataObject.MovementSpeed;
    return heroStats;
}
// accepts the hero specific object and builds hero json object
function makeHeroObject(dataObject) {
    if (!dataObject) { return null; }
    const heroObject = {};
    heroObject.name = dataObject.workshop_guide_name;
    if (dataObject.Team === 'Good') {
        heroObject.alignment = 'Radiant';
    } else {
        heroObject.alignment = 'Dire';
    }
    heroObject.complexity = dataObject.Complexity;
    const roleObject = makeRoleObject(dataObject);
    heroObject.roles = JSON.stringify(roleObject);
    return heroObject;
}
/** Actual goal * */
const heroes = [];
Object.keys(heroData).map((initialKey) => {
    Object.keys(heroData[initialKey]).map((key) => {
        Object.keys(heroData[initialKey][key]).map((finalKey) => {
            const specificHero = heroData[initialKey][key][finalKey];
            const heroObject = makeHeroObject(specificHero);
            const heroStatsObject = makeHeroStatsObject(specificHero);
            heroes.push({ hero: heroObject, heroStats: heroStatsObject });
        });
    });
});
module.exports = heroes;
