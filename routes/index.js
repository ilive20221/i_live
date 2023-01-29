var express = require('express');
const fs = require('fs')
var https = require('http');
var dataList = JSON.parse(fs.readFileSync('./index.json', 'utf8'));

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title:"【有料会員限定】アイライブ鍵",
    content:dataList
  });
});

module.exports = router;

