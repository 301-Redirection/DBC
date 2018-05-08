-- test --
[[ test ]]

function UpdateRoshanDesires()
    local common = 0
    if DotaTime() < 0 then
        common += 0
    end

    return common
end

function UpdateRoamDesires()
    local common = 0
    if DotaTime() < 0 then
        common += 0
    end

    return {common, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}
end

function UpdatePushLaneDesires()
    local common = 0
    if DotaTime() < 0 then
        common += 0
    end

    local topCommon = common

    common = 0
    if DotaTime() < 0 then
        common += 0
    end

    local midCommon = common

    common = 0
    if DotaTime() < 0 then
        common += 0
    end

    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

function UpdateDefendLaneDesires()
    local common = 0
    if DotaTime() < 0 then
        common += 0
    end

    local topCommon = common

    common = 0
    if DotaTime() < 0 then
        common += 0
    end

    local midCommon = common

    common = 0
    if (DotaTime() < 0) or (DotaTime() < 0) or (DotaTime() < 0) then
        common = 10
    end
    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

function UpdateFarmLaneDesires()
    local common = 0
    if DotaTime() < 0 then
        common += 0
    end

    local topCommon = common

    common = 0
    if DotaTime() < 0 then
        common += 0
    end

    local midCommon = common

    common = 0
    if DotaTime() < 0 then
        common += 0
    end

    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

