module.exports = {
    generateTeamDesires(req) {      
        var trigger = '';
        var operator = '';   
        var scriptBuilder = '';

        //Adds the script name and the description as a comment at the top of the file
        scriptBuilder += '-- ' + req.body['teamDesires']['name'] + '--\n \
        [[ ' + req.body.teamDesires.description + ']]\n';
        
        //Creates the UpdateRoshanDesire function            
        trigger = this.getTrigger(req.body.teamDesires.roshan.trigger);
        operator = this.getOperator(req.body.teamDesires.roshan.operator);
        scriptBuilder += 'function UpdateRoshanDesires()\n';        
        scriptBuilder += '    ' + this.getAlliedHeroesAlive();
        scriptBuilder += '    ' + this.getEnemyHeroesAlive();
        scriptBuilder += `    if ${trigger} ${operator} then\n`;
        scriptBuilder += `        return ${req.body.teamDesires.roshan/10};\n`;
        scriptBuilder += `     end\n`;
        scriptBuilder += 'end\n\n';

        //Creates the UpdateRoamDesire function
        scriptBuilder += 'function UpdateRoamDesires()\n';
        scriptBuilder += `    return \{${req.body.teamDesires.roam/10}, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}\n`;
        scriptBuilder += 'end\n\n';

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

    getEnemyHeroesAlive() {
        var code = '';
        code += 'local enemiesAlive = 0\n';
        code += 'for _,h in pairs(UNIT_LIST_ENEMY_HEROES) do\n';
        code += '   if h:IsAlive() then\n';
        code += '       enemiesAlive = enemiesAlive + 1\n';
        code += '   end\n';
        code += 'end\n\n';
        return code;
    },

    getAlliedHeroesAlive() {
        var code = '';
        code += 'local alliesAlive = 0\n';
        code += 'for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do\n';
        code += '   if h:IsAlive() then\n';
        code += '       alliesAlive = alliesAlive + 1\n';
        code += '   end\n';
        code += 'end\n\n';
        return code;
    },

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

const TRIGGER = {
    Time: 1,
    EnemyHeroesAlive: 2,
    AlliedHeroesAlive: 3
}

const OPERATOR = {
    LessThan: 1,
    LessThanEqualTo: 2,
    EqualTo: 3,
    GreaterThanEqualTo: 4,
    GreaterThan: 5,
    NotEqual: 6
} 