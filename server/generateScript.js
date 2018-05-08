const ENUM = require('./enumConfig');

module.exports = {

    // Generate the Lua script for team desires
    generateTeamDesires(req) {                    
        var scriptBuilder = ``;

        // Adds the script name and the description as a comment at the top of the file
        scriptBuilder += `-- ` + req.body.teamDesires.name + ` --\n[[ ` + req.body.teamDesires.description + ` ]]\n\n`;
        
        // Creates the UpdateRoshanDesire function    
        scriptBuilder += this.generateRoshanDesires(req);        
        
        // Creates the UpdateRoamDesire function
        scriptBuilder += this.generateRoamDesires(req);        
        
        // Creates the UpdatePushLaneDesires function        
        scriptBuilder += this.generatePushLaneDesires(req);       

        // Creates the UpdateDefendLaneDesires function
        scriptBuilder += this.generateDefendLaneDesires(req);       
        
        // Creates the UpdateFarmLaneDesires function    
        scriptBuilder += this.generateFarmLaneDesires(req);        
        
        return scriptBuilder;
    },

    // Generate roshan desires
    generateRoshanDesires(req) {                  
        var roshan = req.body.teamDesires.config.roshan;                    
        var scriptBuilder = `function UpdateRoshanDesires()\n`;        
        scriptBuilder += `    local common = ${roshan.initialValue}\n`;        
        scriptBuilder += this.getConditions(roshan.compoundConditions, false);                
        scriptBuilder += `    return common\n`;
        scriptBuilder += `end\n\n`;
        return scriptBuilder;
    },

    // Generate roam desires
    generateRoamDesires(req) {               
        var roam = req.body.teamDesires.config.roam;
        var scriptBuilder = `function UpdateRoamDesires()\n`;        
        scriptBuilder += `    local common = ${roam.initialValue}\n`;
        scriptBuilder += this.getConditions(roam.compoundConditions, false);        
        scriptBuilder += `    return {common, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}\n`;
        scriptBuilder += `end\n\n`;    
        return scriptBuilder;
    },

    // Generate push desire
    generatePushLaneDesires(req) {                 
        var push = req.body.teamDesires.config.push;
        var scriptBuilder = `function UpdatePushLaneDesires()\n`;        

        scriptBuilder += `    local common = ${push.top.initialValue}\n`;
        scriptBuilder += this.getConditions(push.top.compoundConditions, true);
        scriptBuilder += `    local topCommon = common\n\n`;

        scriptBuilder += `    common = ${push.mid.initialValue}\n`;
        scriptBuilder += this.getConditions(push.mid.compoundConditions, true);
        scriptBuilder += `    local midCommon = common\n\n`;

        scriptBuilder += `    common = ${push.bot.initialValue}\n`;
        scriptBuilder += this.getConditions(push.bot.compoundConditions, true);
        scriptBuilder += `    local botCommon = common\n\n`;

        scriptBuilder += `    return {topCommon, midCommon, botCommon}\n`;
        scriptBuilder += 'end\n\n';

        return scriptBuilder;
    },

    // Generate defend desire
    generateDefendLaneDesires(req) {                     
        var defend = req.body.teamDesires.config.defend;           
        var scriptBuilder = `function UpdateDefendLaneDesires()\n`;        

        scriptBuilder += `    local common = ${defend.top.initialValue}\n`;
        scriptBuilder += this.getConditions(defend.top.compoundConditions, true);
        scriptBuilder += `    local topCommon = common\n\n`;

        scriptBuilder += `    common = ${defend.mid.initialValue}\n`;
        scriptBuilder += this.getConditions(defend.mid.compoundConditions, true);
        scriptBuilder += `    local midCommon = common\n\n`;

        scriptBuilder += `    common = ${defend.bot.initialValue}\n`;
        scriptBuilder += this.getConditions(defend.bot.compoundConditions, true);
        scriptBuilder += `    local botCommon = common\n\n`;

        scriptBuilder += `    return {topCommon, midCommon, botCommon}\n`;
        scriptBuilder += 'end\n\n';

        return scriptBuilder;
    },

    // Generate farm desire
    generateFarmLaneDesires(req) {          
        var farm = req.body.teamDesires.config.farm;
        var scriptBuilder = `function UpdateFarmLaneDesires()\n`;        

        scriptBuilder += `    local common = ${farm.top.initialValue}\n`;
        scriptBuilder += this.getConditions(farm.top.compoundConditions, true);
        scriptBuilder += `    local topCommon = common\n\n`;

        scriptBuilder += `    common = ${farm.mid.initialValue}\n`;
        scriptBuilder += this.getConditions(farm.mid.compoundConditions, true);
        scriptBuilder += `    local midCommon = common\n\n`;

        scriptBuilder += `    common = ${farm.bot.initialValue}\n`;
        scriptBuilder += this.getConditions(farm.bot.compoundConditions, true);
        scriptBuilder += `    local botCommon = common\n\n`;

        scriptBuilder += `    return {topCommon, midCommon, botCommon}\n`;
        scriptBuilder += 'end\n\n';

        return scriptBuilder;
    },

    // Get conditions in the compoundConditions array
    getConditions(compoundConditions, isLane) {              
        var override = false;
        var overrideValue;
        var trigger = ``;
        var operator = ``;
        var action = ``;
        var logicalOperator = ``;   
        var scriptBuilder = ``;

        compoundConditions.forEach(compound => {            
            // If there is only 1 condition, then use the format of a single Condition instance.
            if (compound.conditions.length == 1) {                
                var condition = compound.conditions[0];                                                          
                trigger = this.getTrigger(condition.trigger);                                
                operator = this.getOperator(condition.operator);                
                action = this.getAction(condition.action);
                
                if (condition.trigger == TRIGGER.AlliedHeroesAlive)
                    scriptBuilder += this.getAlliedHeroesAlive();
                else if (condition.trigger == TRIGGER.EnemyHeroesAlive)
                    scriptBuilder += this.getEnemyHeroesAlive();

                scriptBuilder += `    if ${trigger} ${operator} ${condition.conditional} then\n`;
                scriptBuilder += `        ${action} ${condition.value}\n`;
                scriptBuilder += `    end\n\n`;
                
            }
            else {                                         
                var conditions = compound.conditions;                                

                // Begin if statement for the current CompoundCondition
                scriptBuilder += `    if`;                
                var totalValue = 0;
                var i = 0;                

                for (i = 0 ; i < conditions.length - 1 ; i++) {                                         
                    trigger = this.getTrigger(conditions[i].trigger);
                    operator = this.getOperator(conditions[i].operator);                    
                    action = this.getAction(conditions[i].action);   
                    logicalOperator = this.getLogicalOperator(compound.logicalOperator[i]);                    
                    totalValue += conditions[i].value;

                    if (action == 'return') {
                        override = true;
                        overrideValue = conditions[i].value;
                    }                        
                    
                    scriptBuilder += ` (${trigger} ${operator} ${conditions[i].conditional}) ${logicalOperator}`;                    
                }                                
                
                // Get the properties of the last condition
                trigger = this.getTrigger(conditions[i].trigger);
                operator = this.getOperator(conditions[i].operator);
                action = this.getAction(conditions[i].action);
                totalValue += conditions[i].value;
                
                if (action == 'return'){
                    override = true;
                    overrideValue = conditions[i].value;
                }                    

                scriptBuilder += ` (${trigger} ${operator} ${conditions[i].conditional}) then\n`; 
                                
                if (override == false)
                    scriptBuilder += `        ${conditions[0].action} ${totalValue/conditions.length}\n`;                
                else if (isLane == true) 
                    scriptBuilder += `        common = ${overrideValue}\n`;
                else 
                    scriptBuilder += `        return ${overrideValue}\n`;
                
                scriptBuilder += `    end\n`;
            }                        
        });
        
        return scriptBuilder;
    },        

    // Get the number of Enemy Heroes alive
    getEnemyHeroesAlive() {
        var code = '';
        code += '    local enemiesAlive = 0\n';
        code += '    for _,h in pairs(UNIT_LIST_ENEMY_HEROES) do\n';
        code += '        if h:IsAlive() then\n';
        code += '            enemiesAlive = enemiesAlive + 1\n';
        code += '        end\n';
        code += '    end\n\n';
        return code;
    },

    // Get the number of Allied Heroes alive
    getAlliedHeroesAlive() {
        var code = '';
        code += '    local alliesAlive = 0\n';
        code += '    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do\n';
        code += '        if h:IsAlive() then\n';
        code += '            alliesAlive = alliesAlive + 1\n';
        code += '        end\n';
        code += '    end\n\n';
        return code;
    },

    // Return a string representation of the passed trigger
    getTrigger(trigger) {        
        var triggerString = '';
        switch(trigger) {
            case TRIGGER.Time:
                // Gets the game time. Matches game clock. Pauses with game pause.
                triggerString = 'DotaTime()';
                break;
            case TRIGGER.EnemyHeroesAlive:
                // Get number of enemy heroes alive
                triggerString = 'enemiesAlive';
                break;
            case TRIGGER.AlliedHeroesAlive:
                // Get number of allied heroes alive
                triggerString = 'alliesAlive';
                break;
        }
        return triggerString;
    },

    // Return a string representation of the passed operator
    getOperator(operator) {
        var operatorString = '';
        switch(operator) {
            case OPERATOR.LessThan:
                operatorString = '<';
                break;
            case OPERATOR.LessThanEqualTo:
                operatorString = '<=';
                break;
            case OPERATOR.EqualTo:
                operatorString = '==';
                break;
            case OPERATOR.GreaterThanEqualTo:
                operatorString = '>=';
                break;
            case OPERATOR.GreaterThan:
                operatorString = '>';
                break;
            case OPERATOR.NotEqual:
                operatorString = '!=';
                break;
        }
        return operatorString;
    },

    // Return a string representation of the passed action
    getAction(action) {
        var actionString = '';
        switch(action) {
            case ACTION.Modify:                 
                actionString = 'common +='; // TODO: Decide on a modify method to use
                break;
            case ACTION.Return:
                actionString = 'return';
                break;
        }
        return actionString;
    },

    // Return a string representation of the passed logical operator
    getLogicalOperator(logicalOperator) {
        var operatorString = '';
        switch(logicalOperator) {
            case LOGICAL_OPERTAOR.AND:
                operatorString = 'and';
                break;
            case LOGICAL_OPERTAOR.OR:
                operatorString = 'or';
                break;
        }
        return operatorString;
    }
};

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
    Return: 2 // OVERRIDE
}

// Logical Operator enum
const LOGICAL_OPERTAOR = {
    AND: 1,
    OR: 2
}