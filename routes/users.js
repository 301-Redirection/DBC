const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
const fs = require('fs');

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
    res.render('user', {
        user: req.user ,
        userProfile: JSON.stringify(req.user, null, '  ')
    });
});

router.get('/generate', ensureLoggedIn, function(req, res, next) {
    lua = "io.write(\"Hello World\\n\")";
    try {
        fs.mkdirSync("./Lua");
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
    fs.writeFile('./Lua/hello.lua', lua, (err) => {
        if (err) throw err;
        // res.send("File Generated: hello.lua");
        var file = "./Lua/hello.lua";
        res.download(file);
    });
});


module.exports = router;
