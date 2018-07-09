-- test --
[[ complex object test ]]

function getEnemyHeroesAlive() {    
    local enemiesAlive = 0
    for _,h in pairs(UNIT_LIST_ENEMY_HEROES)
        if h:IsAlive() then
            enemiesAlive = enemiesAlive + 1
        end
    end
    return enemiesAlive
end

function getAlliedHeroesAlive() {    
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ENEMY_HEROES)
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end
    return alliesAlive
end

function UpdateRoshaneDesires()
    local common = 0.25
    local enemiesAlive = getEnemyHeroesAlive()
    if (DotaTime() >= 35) or (enemiesAlive <= 3) then
        common += 0.35
    end
    return common
end

function UpdateRoamDesires()
    local common = 0.25
    if ( <= 2) then
        common += -0.25
    end
    if (DotaTime() <= 15) or ( >= 1) then
        common += 0.325
    end
    return {common, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}
end

function UpdatePushLaneDesires()
    local common = 0.2
    if (DotaTime() < 5) then
        common += 0.1
    end
    local alliesAlive = getAlliedHeroesAlive()
    local enemiesAlive = getEnemyHeroesAlive()
    if (enemiesAlive <= 3) and (alliesAlive >= 4) and ( <= 1200) then
        common += 0.31666666666666665
    end
    local topCommon = common
    
    common = 0.25
    if (DotaTime() < 10) then
        common = 0.25
    end
    local midCommon = common
    
    common = 0.25
    if (DotaTime() <= 15) then
        common = 0.25
    end
    local botCommon = common
    
    return {topCommon, midCommon, botCommon}
end

function UpdateDefendLaneDesires()
    local common = 0.25
    if (DotaTime() < 5) then
        common += 0.25
    end
    local topCommon = common
    
    common = 0.25
    if (DotaTime() < 5) then
        common += 0.25
    end
    local midCommon = common
    
    common = 0.25
    if (DotaTime() < 5) then
        common += 0.25
    end
    local botCommon = common
    
    return {topCommon, midCommon, botCommon}
end

function UpdateFarmLaneDesires()
    local common = 0.25
    if (DotaTime() <= 20) then
        common += 0.5
    end
    local enemiesAlive = getEnemyHeroesAlive()
    if (enemiesAlive >= 3) or ( >= 3) then
        common += -0.225
    end
    local topCommon = common
    
    common = 0.25
    if (DotaTime() < 5) then
        common += 0.25
    end
    local midCommon = common
    
    common = 0.35
    if (DotaTime() <= 20) then
        common += 0.5
    end
    local enemiesAlive = getEnemyHeroesAlive()
    if (enemiesAlive >= 3) and ( >= 3) then
        common += -0.15
    end
    local botCommon = common
    
    return {topCommon, midCommon, botCommon}
end

