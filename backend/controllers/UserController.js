/**
 *  This class defines an interface to be used related to any aspect
 *  about the user such as retrieving their data etc.
 */

const fs = require('fs');

class UserController {
    static getProfile(request, response) {
        response.render('user', {
            user: request.user,
            userProfile: JSON.stringify(request.user, null, ' '),
        });
    }

    // TODO: Remove Legacy Code at some point
    static generate(request, response) {
        const lua = 'io.write("Hello World\\n")';
        try {
            fs.mkdirSync('./Lua');
        } catch (err) {
            if (err.code !== 'EEXIST') throw err;
        }
        fs.writeFile('./Lua/hello.lua', lua, (err) => {
            if (err) throw err;
            // res.send('File Generated: hello.lua');
            const file = './Lua/hello.lua';
            response.download(file);
        });
    }
}
module.exports.UserController = UserController;
