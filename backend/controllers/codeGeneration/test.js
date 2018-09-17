// const revalidator = require('revalidator');

// const object = {
//     something: [1, 2, 3],
// };
// const other = {
//     something: [1, 2, 3, 4],
// };

// const validConfig = {
//     properties: {
//         something: {
//             type: 'array',
//             maxLength: 4,
//             minLength: 4,
//             required: true,
//         },
//     },
// };
// console.log(revalidator.validate(object, validConfig));
// console.log(revalidator.validate(other, validConfig));

const { ConfigurationValidator } = require('./ConfigurationValidator.js');
const exampleObjectDefault = require('../../../config/exampleConfigurationsBots/default.js');
const exampleObjectDefaultAllHeroes = require('../../../config/exampleConfigurationsBots/defaultAllHeroes.js');
const exampleObjectDefaultHeroesByPos = require('../../../config/exampleConfigurationsBots/defaultHeroesByPosition.js');
const exampleObjectDefaultItemsSpecified = require('../../../config/exampleConfigurationsBots/defaultItemsSpecified.js');
const exampleObjectDefaultAbilitiesSpecified = require('../../../config/exampleConfigurationsBots/defaultAbilitiesSpecified.js');
const exampleObjectComplexOne = require('../../../config/exampleConfigurationsBots/complexOne.js');

// console.log(ConfigurationValidator.validate);

try {
    // console.log(exampleObjectDefault.body.configuration);
    ConfigurationValidator.validate(exampleObjectDefault.body.configuration);
    // console.log(exampleObjectDefaultAllHeroes.body.configuration);
    ConfigurationValidator.validate(exampleObjectDefaultAllHeroes.body.configuration);
    ConfigurationValidator.validate(exampleObjectDefaultHeroesByPos.body.configuration);
    // console.log(exampleObjectDefaultItemsSpecified.body.configuration.heroes[0].items);
    ConfigurationValidator.validate(exampleObjectDefaultItemsSpecified.body.configuration);
    // console.log(exampleObjectDefaultAbilitiesSpecified.body.configuration);
    ConfigurationValidator.validate(exampleObjectDefaultAbilitiesSpecified.body.configuration);
    ConfigurationValidator.validate(exampleObjectComplexOne.body.configuration);
    // ConfigurationValidator.validate({});
    // ConfigurationValidator.validate([]);
    // const res = ConfigurationValidator.validate(undefined);
    // ConfigurationValidator.validate(exampleObjectComplexOne.body.configuration);
} catch (exception) {
    // console.log(exception);
}
