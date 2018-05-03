// Trigger enum
const TRIGGER = {
    Time: 1,
    EnemyHeroesAlive: 2,
    AlliedHeroesAlive: 3
}

// Operator enum
const OPERATOR = {
    LessThan: 1,
    LessThanEqualTo: 2,
    EqualTo: 3,
    GreaterThanEqualTo: 4,
    GreaterThan: 5,
    NotEqual: 6
} 

// Action enum
const ACTION = {
    Modify: 1,
    Return: 2 // TODO: Decide what to do if a value is returned where there are multiple values to be outputted (eg. return {0,0,0})
}

// Logical Operator enum
const LOGICAL_OPERTAOR = {
    AND: 1,
    OR: 2
}