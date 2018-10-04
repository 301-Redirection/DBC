const { validate } = require('jsonschema');
const { validBotConfig } = require('./validConfig.js');

class ConfigurationValidator {
    static validate(botConfig) {
        if (botConfig) {
            return validate(botConfig, validBotConfig);
        }
        return { valid: false, errors: ['No Botconfig'] };
    }
}
module.exports.ConfigurationValidator = ConfigurationValidator;
