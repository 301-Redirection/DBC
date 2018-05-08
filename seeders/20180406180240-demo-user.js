function makeid(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

module.exports = {
    up: (queryInterface) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        const users = [];
        for (let i = 1; i < 26; i += 1) {
            users.push({
                firstName: makeid(10),
                lastName: makeid(10),
                auth0_id: makeid(5),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        return queryInterface.bulkInsert('Users', users, {});
    },

    down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
