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
    if (DotaTime() >= 2100) or (enemiesAlive <= 3) then
        common += 0.35
    end
    return common
end

function UpdateRoamDesires()
    local common = 0.25
    local alliesAlive = getAlliedHeroesAlive()
    if (alliesAlive <= 2) then
        common += -0.25
    end
    local alliesAlive = getAlliedHeroesAlive()
    if (DotaTime() <= 900) or (alliesAlive >= 1) then
        common += 0.325
    end
    return common
end

function UpdatePushLaneDesires()
    local common = 0.2
    if (DotaTime() < 300) then
        common += 0.1
    end
    local alliesAlive = getAlliedHeroesAlive()
    local enemiesAlive = getEnemyHeroesAlive()
    if (enemiesAlive <= 3) and (alliesAlive >= 4) and (DotaTime() <= 72000) then
        common += 0.35
    end
    local topCommon = common
    
    common = 0.25
    if (DotaTime() < 600) then
        common = 0.25
    end
    local midCommon = common
    
    common = 0.25
    if (DotaTime() <= 900) then
        common = 0.25
    end
    local botCommon = common
    
    return {topCommon, midCommon, botCommon}
end

function UpdateDefendLaneDesires()
    local common = 0.25
    if (DotaTime() < 300) then
        common += 0.25
    end
    local topCommon = common
    
    common = 0.25
    if (DotaTime() < 300) then
        common += 0.25
    end
    local midCommon = common
    
    common = 0.25
    if (DotaTime() < 300) then
        common += 0.25
    end
    local botCommon = common
    
    return {topCommon, midCommon, botCommon}
end

function UpdateFarmLaneDesires()
    local common = 0.25
    if (DotaTime() <= 1200) then
        common += 0.5
    end
    local enemiesAlive = getEnemyHeroesAlive()
    if (enemiesAlive >= 3) or (DotaTime() >= 180) then
        common += -0.225
    end
    local topCommon = common
    
    common = 0.25
    if (DotaTime() < 300) then
        common += 0.25
    end
    local midCommon = common
    
    common = 0.35
    if (DotaTime() <= 1200) then
        common += 0.5
    end
    local enemiesAlive = getEnemyHeroesAlive()
    if (enemiesAlive >= 3) and (DotaTime() >= 180) then
        common += -0.15
    end
    local botCommon = common
    
    return {topCommon, midCommon, botCommon}
end

