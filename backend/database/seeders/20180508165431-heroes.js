module.exports = {
    up: queryInterface => queryInterface,
    down: queryInterface => queryInterface.bulkDelete('Hero', null, {}),
};
