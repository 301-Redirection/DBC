var express = require('express');
var router = express.Router();

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/generate', function(req, res, next) {
  lua = "io.write(\"Hello World\\n\")";
  fs.writeFile('./Lua/hello.lua', lua, (err) => {
    if (err) throw err;
    // res.send("File Generated: hello.lua");
    var file = "./Lua/hello.lua";
    res.download(file);
  });
});

router.get("/test", (request, response) => {
    response.status(500).send({ "message": "This is an error response" });
});

module.exports = router;
