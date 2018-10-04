-- test --
[[ default object test ]]

function validateDesire(desire)
    if desire > 1 then
        desire = 1
    end
    if desire < 0 then
        desire = 0
    end
    return desire
end

function UpdateRoshaneDesires()
    local common = 0.25
    if (DotaTime() < 300) then
        common += 0.25
    end
    return common
end

function UpdateRoamDesires()
    local common = 0.25
    if (DotaTime() < 300) then
        common += 0.25
    end
    return common
end

function UpdatePushLaneDesires()
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

