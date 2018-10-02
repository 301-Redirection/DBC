/** Specific subtypes that are re-used often */
const validNumber = {
    type: ['number', 'null'],
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
    type: ['number', 'null'],
    minimum: -100,
    maximum: 100,
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

/** Specific Validation Types for the BotConfigObjects */
const heroPoolValidConfig = {
    type: 'object',
    properties: {
        partitioned: validBoolean,
        pool: {
            type: 'array', // Note not required
            items: {
                type: heroConfigurationValidConfig,
            },
        },
    },
};

const validItemComponent = {
    properties: {
        name: validString,
        components: validArray,
    },
};

const heroSpecificationValidConfig = {
    properties: {
        name: validString,
        abilities: { // Note not required
            type: 'string',
            minLength: 25,
            maxLength: 25,
        },
        talents: { // Note not required but if abilities is present then so must talents
            type: 'array',
            minItems: 4,
            maxItems: 4,
        },

        dependencies: {
            talents: {
                required: ['abilities'],
            },
        },
        items: {
            type: 'array', // Note not required
            items: {
                type: validItemComponent,
            },
        },
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
    type: 'object',
    required: true,
    properties: {
        push: validLaneConfig,
        farm: validLaneConfig,
        defend: validLaneConfig,
        roam: validConfig,
        roshan: validConfig,
    },
};

const validBotConfig = {
    properties: {
        heroPool: heroPoolValidConfig,
        heroes: { // note, not required
            type: 'array',
            items: {
                type: heroSpecificationValidConfig,
            },
        },
        configuration: {
            properties: {
                desires: desiresValidConfig,
            },
        },
    },
};

module.exports = {
    validBotConfig,
};
