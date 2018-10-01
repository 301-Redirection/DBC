/** Specific subtypes that are re-used often */
const validNumber = {
    type: 'number',
    required: true,
};

const validArray = {
    type: 'array',
    required: true,
};

const validString = {
    type: 'string',
    required: true,
};

const validBoolean = {
    type: 'boolean',
    required: true,
};

// A Number that ranges from -1 to 1
const validProportion = {
    type: 'number',
    minimum: -1,
    maximum: 1,
    required: true,
};

// a condition
const validCondition = {
    properties: {
        trigger: validNumber,
        operator: validNumber,
        conditional: validNumber,
    },
};

// a valid conditionsArray
const validConditions = {
    type: 'array',
    required: true,
    items: {
        type: validCondition,
    },
};

// a compound condition
const compoundConditionConfig = {
    type: 'array',
    items: {
        type: {
            properties: {
                conditions: validConditions,
                logicalOperators: validArray,
                action: validNumber,
                value: validProportion,
            },
        },
    },
    required: true,
};

/** Specific Validation Types for the BotConfigObjects */
const heroPoolValidConfig = {
    properties: {
        partitioned: validBoolean,
        pool: {
            type: 'array', // Note not required
        },
    },
};

const heroConfigurationValidConfig = {
    properties: {
        name: validString,
        position: {
            type: 'number',
            minimum: -1,
            maximum: 5,
            required: true,
        },
    },
};

const heroSpecificationValidConfig = {
    properties: {
        name: validString,
        abilities: { // Note not required
            type: 'string',
            // TO DO: uncomment this but fix tests
            // minLength: 25,
            // maxLength: 25,
        },
        talents: { // Note not required but if abilities is present then so must talents
            type: 'array',
        },
        items: {
            type: 'array', // Note not required
        },
    },
};

const validItemComponent = {
    properties: {
        name: validString,
        components: validArray,
    },
};

const validConfig = {
    properties: {
        compoundConditions: compoundConditionConfig,
        initialValue: validProportion,
    },
    required: true,
};

const validLaneConfig = {
    properties: {
        top: validConfig,
        mid: validConfig,
        bot: validConfig,
    },
};

const desiresValidConfig = {
    properties: {
        push: validLaneConfig,
        farm: validLaneConfig,
        defend: validLaneConfig,
        roam: validConfig,
        roshan: validConfig,
    },
};

const overallValidConfig = {
    properties: {
        heroPool: { // note, not required
            type: 'object',
        },
        heroes: { // note, not required
            type: 'array',
        },
        configuration: {
            properties: {
                desires: {
                    type: 'object',
                    required: true,
                },
            },
        },
    },
};

class ValidationException {
    constructor(generalError, specificError) {
        this.generalError = generalError;
        this.specificError = specificError;
    }
    getErrorType() {
        return this.generalError;
    }
    getError() {
        return this.specificError;
    }
}

module.exports = {
    desiresValidConfig,
    validLaneConfig,
    validConfig,
    heroSpecificationValidConfig,
    compoundConditionConfig,
    validNumber,
    validProportion,
    heroPoolValidConfig,
    heroConfigurationValidConfig,
    overallValidConfig,
    validItemComponent,
    ValidationException,
};
