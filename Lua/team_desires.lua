-- test --
[[ test ]]

function UpdateRoshanDesires()
    local common = 0
    return common
end

function UpdateRoamDesires()
    local common = 0
    return {common, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}
end

function UpdatePushLaneDesires()
    local common = 0
    local topCommon = common

    common = 0
    local midCommon = common

    common = 0
    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

function UpdateDefendLaneDesires()
    local common = 0
    local topCommon = common

    common = 0
    local midCommon = common

    common = 0
    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

function UpdateFarmLaneDesires()
    local common = 0
    local topCommon = common

    common = 0
    local midCommon = common

    common = 0
    local botCommon = common

    return {topCommon, midCommon, botCommon}
end

