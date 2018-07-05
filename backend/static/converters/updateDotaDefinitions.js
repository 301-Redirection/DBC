const config = require('../../../config/config.js');
const request = require('request');
const fs = require('fs');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var download = async function(uri, filename, callback){
  await request.head(uri, function(err, res, body){

    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

/* ITEMS */
request(config.app.static_urls.items, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    let itemdata = body.itemdata;
    for(i in itemdata) {
        let item = itemdata[i];
        let url = config.app.static_urls.image + item.img;
        console.log(item.id);
        if(i == 'dagon') {
            console.log(item.components);
        }
        // download(url, `backend/static/images/items/${item.id}.png`, () => { });
    }
});

/* ITEMS */
// request(config.app.static_urls.items, { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     let itemdata = body.itemdata;
//     for(i in itemdata) {
//         let item = itemdata[i];
//         let url = config.app.static_urls.image + item.img;
//         console.log(item.id);
//         download(url, `backend/static/images/items/${item.id}.png`, () => { });
//     }
// });

