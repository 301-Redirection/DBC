module.exports = {
    up: queryInterface => queryInterface,
    down: queryInterface => queryInterface.bulkDelete('HeroStats', null, {}),
};
