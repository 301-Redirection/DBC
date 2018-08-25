----------------------------------------------------------------------------
--	Ranked Matchmaking AI v1.0a
--	Author: adamqqq		Email:adamqqq@163.com
----------------------------------------------------------------------------
local utility = require( GetScriptDirectory().."/utility" ) 

local ItemsToBuy ={
	"mantle",
	"circlet",
	"null_talisman",
	"staff_of_wizardry",
	"dagon_recipe",
	"dagon_2",
	"dagon_3",
	"dagon_4",
	"dagon_5",
	"lame",
	"mantle",
	"circlet",
	"recipe_null_talisman",
	"staff_of_wizardry",
	"dagon_1",
	"dagon_2",
}




utility.checkItemBuild(ItemsToBuy)

function ItemPurchaseThink()
	utility.ItemPurchase(ItemsToBuy)
end