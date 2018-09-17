/** Specific subtypes that are re-used often */
const validNumber = {
    type: 'number',
    required: true,
};

const validArray = {
    type: 'array',
    required: true,
};

const validObject = {
    type: 'object',
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

// A Number that ranges from 0 to 1
const validProportion = {
    type: 'number',
    minimum: 0,
    maximum: 1,
    required: true,
};

// a compound condition
const compoundConditionConfig = {
    conditions: validArray,
    logicalOperators: validArray,
    action: validNumber,
    value: validProportion,
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
        desires: validObject, // note REQUIRED
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
