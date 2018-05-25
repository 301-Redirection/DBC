const express = require('express');
const connectEnsureLogin = require('connect-ensure-login');

const ensureLoggedIn = connectEnsureLogin.ensureLoggedIn();
const router = express.Router();
const fs = require('fs');

/* GET user profile. */
router.get('/', ensureLoggedIn, (req, res) => {
    res.render('user', {
        user: req.user,
        userProfile: JSON.stringify(req.user, null, '  '),
    });
});

router.get('/generate', ensureLoggedIn, (req, res) => {
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
        res.download(file);
    });
});


module.exports = router;
