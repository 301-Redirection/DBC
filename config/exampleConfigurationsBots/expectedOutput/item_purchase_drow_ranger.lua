----------------------------------------------------------------------------
--	Ranked Matchmaking AI v1.0a
--	Author: adamqqq		Email:adamqqq@163.com
----------------------------------------------------------------------------
local utility = require( GetScriptDirectory().."/utility" ) 

local ItemsToBuy ={
	"item_mantle",
	"item_circlet",
	"item_null_talisman",
	"item_staff_of_wizardry",
	"item_dagon_recipe",
	"item_dagon_recipe",
	"item_dagon_recipe",
	"item_dagon_recipe",
	"item_dagon_recipe",
	"item_lame",
	"item_mantle",
	"item_circlet",
	"item_recipe_null_talisman",
	"item_staff_of_wizardry",
	"item_dagon_recipe",
	"item_dagon_recipe",
}




utility.checkItemBuild(ItemsToBuy)

function ItemPurchaseThink()
	utility.ItemPurchase(ItemsToBuy)
end