var { validate } = require('jsonschema');
const {
    desiresValidConfig,
    heroSpecificationValidConfig,
    heroPoolValidConfig,
    heroConfigurationValidConfig,
    overallValidConfig,
    ValidationException,
    validItemComponent,
} = require('./validConfig.js');

class ConfigurationValidator {
    static validate(botConfig) {
        try {
            if (botConfig) {
                this.validateOverallObject(botConfig);
                this.validateDesiresObject(botConfig.configuration.desires);
                if (botConfig.heroPool) {
                    this.validateHeroPool(botConfig.heroPool);
                }
                if (botConfig.heroes) {
                    this.validateHeroSpeficationObject(botConfig.heroes);
                }
                return true;
            }
            return false;
        } catch (exception) {
            throw exception;
        }
    }

    static validateOverallObject(object) {
        const result = validate(object, overallValidConfig);
        if (result.valid === false) {
            throw new ValidationException('Overall Object Structure Invalid', result.errors);
        }
    }

    static validateDesiresObject(object) {
        const result = validate(object, desiresValidConfig);
        if (result.valid === false) {
            // console.log(object.push.top.compoundConditions);
            console.log(result.errors[0]);
            throw new ValidationException('Desires Object Structure Invalid', 'Missing key fields or key fields of wrong type');
        }
    }

    static validateHeroPool(object) {
        let result = validate(object, heroPoolValidConfig);
        // console.log(result);
        if (result.valid === false) {
            throw new ValidationException('Hero Pool Object Structure Invalid', 'Missing key fields or key fields of wrong type');
        }
        if (object.pool) {
            object.pool.forEach((element, index) => {
                result = revalidator.validate(element, heroConfigurationValidConfig);
                if (result.valid === false) {
                    throw new ValidationException('Hero Pool Array Error', `Hero Element ${index} is invalid`);
                }
            });
        }
    }

    static validateHeroSpeficationObject(heroesArray) {
        let result;
        heroesArray.forEach((element, index) => {
            result = validate(element, heroSpecificationValidConfig);
            // console.log(result);
            if (result.valid === false) {
                throw new ValidationException('Hero Specification Array Error', `Hero Specification Element ${index} is invalid`);
            }
            if (element.abilities) {
                if (element.talents.length !== 4) {
                    throw new ValidationException('Hero Specification Talents Error', `Hero Specification Element ${index} - Talents array invalid size`);
                }
            }
            if (element.items) {
                element.items.forEach((item, itemIndex) => {
                    result = validate(item, validItemComponent);
                    // console.log(result);
                    if (result.valid === false) {
                        throw new ValidationException('Hero Specification Items Error', `Hero Specification Element ${index} - Item ${itemIndex} invalid`);
                    }
                });
            }
        });
    }
}
module.exports.ConfigurationValidator = ConfigurationValidator;
