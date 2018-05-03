-- test--
[[ test ]]

function UpdateRoshanDesires()
    local common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    return common
end

function UpdateRoamDesires()
    local common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    return {common, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}
end

function UpdatePushLaneDesires()
    local common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    local topCommon = common

    common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    local midCommon = common

    common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

function UpdateDefendLaneDesires()
    local common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    local topCommon = common

    common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    local midCommon = common

    common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

function UpdateFarmLaneDesires()
    local common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    local topCommon = common

    common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    local midCommon = common

    common = undefined
    if DotaTime() < 0 then
        common += 0
    end

    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

