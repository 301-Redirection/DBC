--**InitialComments**--
-- These first test functions are here to test if the lua code manager is actually
-- working

--**testHelperFunction**--
-- nothing to see here

--**testHelperFunction2**--
-- Other snippet

--**getEnemyHeroesAlive**--
function getEnemyHeroesAlive() {    
    local enemiesAlive = 0
    for _,h in pairs(UNIT_LIST_ENEMY_HEROES)
        if h:IsAlive() then
            enemiesAlive = enemiesAlive + 1
        end
    end
    return enemiesAlive
end

--**getAlliedHeroesAlive**--
function getAlliedHeroesAlive() {    
    local alliesAlive = 0
    for _,h in pairs(UNIT_LIST_ENEMY_HEROES)
        if h:IsAlive() then
            alliesAlive = alliesAlive + 1
        end
    end
    return alliesAlive
end

--**validateDesire**--
function validateDesire(desire)
    if desire > 1 then
        desire = 1
    end
    if desire < 0 then
        desire = 0
    end
    return desire
end