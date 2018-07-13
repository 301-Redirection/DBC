----------------------------------------------------------------------------
--	Ranked Matchmaking AI v1.3
--	Author: adamqqq		Email:adamqqq@163.com
----------------------------------------------------------------------------
local utility = require( GetScriptDirectory().."/utility" ) 		--导入通用函数库

{{- items-to-buy -}}


utility.checkItemBuild(ItemsToBuy)		--检查装备列表

function ItemPurchaseThink()
	utility.BuySupportItem()			--购买辅助物品	对于辅助英雄保留这一行
	utility.BuyCourier()				--购买信使		对于5号位保留这一行
	utility.ItemPurchase(ItemsToBuy)	--购买装备
end