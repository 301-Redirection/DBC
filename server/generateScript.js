module.exports = {
    // Generate the Lua script for team desires
    generateTeamDesires(req) {      
        var trigger = '';
        var operator = '';   
        var scriptBuilder = '';

        //Adds the script name and the description as a comment at the top of the file
        scriptBuilder += '-- ' + req.body['teamDesires']['name'] + '--\n \
        [[ ' + req.body.teamDesires.description + ']]\n';
        
        //Creates the UpdateRoshanDesire function    
        scriptBuilder += this.generateRoshanDesire(req);
        // scriptBuilder += 'function UpdateRoshanDesires()\n';    
        // scriptBuilder += `    return ${req.body.teamDesires.roshan/10};\n`
        // scriptBuilder += 'end\n\n'; 

        //Creates the UpdateRoamDesire function
        scriptBuilder += this.generateRoamDesire(req);
        // scriptBuilder += 'function UpdateRoamDesires()\n';
        // scriptBuilder += `    return \{${req.body.teamDesires.roam/10}, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}\n`;
        // scriptBuilder += 'end\n\n';

        //Creates the UpdatePushLaneDesires function
        scriptBuilder += 'function UpdatePushLaneDesires() \n';
        scriptBuilder += `    return \{${(req.body.teamDesires.push.top)/10}, ${(req.body.teamDesires.push.mid)/10}, ${(req.body.teamDesires.push.bot)/10}\}\n`;
        scriptBuilder += 'end\n\n';

        //Creates the UpdateDefendLaneDesires function
        scriptBuilder += 'function UpdateDefendLaneDesires() \n';
        scriptBuilder += `    return {${(req.body.teamDesires.defend.top)/10}, ${(req.body.teamDesires.defend.mid)/10}, ${(req.body.teamDesires.defend.bot)/10}}\n`;
        scriptBuilder += 'end\n\n';

        //Creates the UpdateFarmLaneDesires function    
        scriptBuilder += 'function UpdateFarmLaneDesires() \n';
        scriptBuilder += `    return {${(req.body.teamDesires.farm.top)/10}, ${(req.body.teamDesires.farm.mid)/10}, ${(req.body.teamDesires.farm.bot)/10}}\n`;
        scriptBuilder += 'end';

        return scriptBuilder;
    },

    // Access conditions in the compound conditions
    getConditions(conditions) {
        var scriptBuilder = ``;
        scriptBuilder += `    local common = 0`;        

        conditions.forEach(condition => {
            trigger = this.getTrigger(condition.trigger);
            operator = this.getOperator(condition.operator);
            
            if (condition.trigger == TRIGGER.AlliedHeroesAlive) {
                scriptBuilder += this.getAlliedHeroesAlive();
            }
            else if (condition.trigger == TRIGGER.EnemyHeroesAlive) {
                scriptBuilder += this.getEnemyHeroesAlive();
            }

            scriptBuilder += `    if ${trigger} ${operator} ${condition.conditional} then\n`;
            scriptBuilder += `        ${condition.action} ${condition.value}\n`;
            scriptBuilder += `    end\n`;            
        });
        
        return scriptBuilder;
    },
    
    // Generate roshan desires
    generateRoshanDesire(req) {
        conditions = req.body.teamDesires.roshan;                

        scriptBuilder += `function UpdateRoshanDesires()\n`;        

        scriptBuilder += this.getConditions(conditions);
        scriptBuilder += `end\n`;

        return scriptBuilder;
    },

    // Generate roam desires
    generateRoamDesires(req) {
        conditions = req.body.teamDesires.roam;

        scriptBuilder += `function UpdateRoamDesires()\n`;        

        scriptBuilder += this.getConditions(conditions);

        scriptBuilder += `    return \{${req.body.teamDesires.roam/10}, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}\n`;
        scriptBuilder += `end\n`;

        return scriptBuilder;
    },

    // Generate push desire
    generatePushLaneDesire(req) {        
        topCondition = req.body.teamDesires.push.top;
        midCondition = req.body.teamDesires.push.mid;
        botCondition = req.body.teamDesires.push.bot;

        scriptBuilder += `function UpdatePushLaneDesires() \n`;

        scriptBuilder += this.getConditions(topCondition);
        scriptBuilder += this.getConditions(midCondition);
        scriptBuilder += this.getConditions(botCondition);

        scriptBuilder += `    return \{${(req.body.teamDesires.push.top)/10}, ${(req.body.teamDesires.push.mid)/10}, ${(req.body.teamDesires.push.bot)/10}\}\n`;
        scriptBuilder += 'end\n\n';

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