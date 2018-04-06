
----- Select all the heroes -----

radHero1 = "luna";
radHero2 = "lina";
radHero3 = "lycan";
radHero4 = "lion";
radHero5 = "life_stealer";

dirHero1 = "omniknight";
dirHero2 = "dark_seer";
dirHero3 = "rubick";
dirHero4 = "invoker";
dirHero5 = "disruptor";

---------------------------------
----- Tables of heroes and their lanes -----
-- top = LANE_TOP
-- bot = LANE_BOT
-- mid = LANE_MID

local tableRadiantHeroes = { 
    {"npc_dota_hero_" .. radHero1,  LANE_BOT},
    {"npc_dota_hero_" .. radHero2,  LANE_BOT},
    {"npc_dota_hero_" .. radHero3,  LANE_BOT},
    {"npc_dota_hero_" .. radHero4,  LANE_BOT},
    {"npc_dota_hero_" .. radHero5,  LANE_BOT},
};

local tableDireHeroes =  { 
    {"npc_dota_hero_" .. dirHero1,  LANE_TOP},
    {"npc_dota_hero_" .. dirHero2,  LANE_TOP},
    {"npc_dota_hero_" .. dirHero3,  LANE_TOP},
    {"npc_dota_hero_" .. dirHero4,  LANE_TOP},
    {"npc_dota_hero_" .. dirHero5,  LANE_TOP},
};

local tableTeamHeroes = {};
tableTeamHeroes [TEAM_RADIANT] = tableRadiantHeroes;
tableTeamHeroes [TEAM_DIRE]    = tableDireHeroes;

----- Assigns bots to specified lanes and heroes -----

function Think()

    local tableHeroes = tableTeamHeroes[GetTeam()];
    local tablePlayers = GetTeamPlayers(GetTeam());
    
    for i , player in pairs(tablePlayers)
    do
        SelectHero(player, tableHeroes[i][1]);
    end
    
end

------------------------------------------------------
----- Assigns bots to specified lanes -----

function UpdateLaneAssignments()    

local tableHeroes = tableTeamHeroes[GetTeam()];
local tableLaneAssignments = {};

for i , tableHeroLane in pairs(tableHeroes)
do
  tableLaneAssignments[i] = tableHeroLane[2];
end

return tableLaneAssignments;    
end
-------------------------------------------

function UpdatePushLaneDesires()
	if (GetTeam() == TEAM_RADIANT) then
		return {0, 0, 1};
	end

	if (GetTeam() == TEAM_DIRE) then
		return {1, 0.5, 0};
	end
end

function UpdateFarmLaneDesires()
	if (GetTeam() == TEAM_RADIANT) then
		return {1, 1, 1};
	end
end

function UpdateRoshanDesire()
	return 0.99;
end