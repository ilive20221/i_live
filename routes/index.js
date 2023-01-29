var express = require('express');
const fs = require('fs')
var https = require('http');
var dataList = JSON.parse(fs.readFileSync('./index.json', 'utf8'));
//var data = [];
//https.get(url, function (res) {
//  res.on('data', function(chunk) {
//    data.push(chunk);
//  }).on('end', function() {
//    var events   = Buffer.concat(data);
//    // オブジェクト形式に変換する(パースする)
//    var r = JSON.parse(events);
//    //console.log(r);
//  });
//});


var router = express.Router();
//const da = fs.readFileSync(`index.json`, "utf-8");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title:"アイライブ",
    content:dataList
  });
});

module.exports = router;
