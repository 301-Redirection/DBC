-- test --
[[ test ]]

function UpdateRoshanDesires()
    local common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        return 0
    end
    return common
end

function UpdateRoamDesires()
    local common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        return 0
    end
    return {common, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}
end

function UpdatePushLaneDesires()
    local common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        common = 0
    end
    local topCommon = common

    common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        common = 0
    end
    local midCommon = common

    common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        common = 0
    end
    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

function UpdateDefendLaneDesires()
    local common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        common = 0
    end
    local topCommon = common

    common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        common = 0
    end
    local midCommon = common

    common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        common = 0
    end
    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

function UpdateFarmLaneDesires()
    local common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        common = 0
    end
    local topCommon = common

    common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        common = 0
    end
    local midCommon = common

    common = 0
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ALLIED_HEROES) do
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end

    if (DotaTime() < 0) and (alliesAlive == 5) then
        common = 0
    end
    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

