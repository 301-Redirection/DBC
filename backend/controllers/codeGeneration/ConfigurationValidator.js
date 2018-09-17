const revalidator = require('revalidator');
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
                this.validateDesiresObject(botConfig.desires);
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
        const result = revalidator.validate(object, overallValidConfig);
        // console.log(result);
        if (result.valid === false) {
            throw new ValidationException('Overall Object Structure Invalid', 'Missing key fields or key fields of wrong type');
        }
    }

    static validateDesiresObject(object) {
        const result = revalidator.validate(object, desiresValidConfig);
        if (result.valid === false) {
            throw new ValidationException('Desires Object Structure Invalid', 'Missing key fields or key fields of wrong type');
        }
    }

    static validateHeroPool(object) {
        let result = revalidator.validate(object, heroPoolValidConfig);
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
            result = revalidator.validate(element, heroSpecificationValidConfig);
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
                    result = revalidator.validate(item, validItemComponent);
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
