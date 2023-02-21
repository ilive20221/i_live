var express = require('express');
const fs = require('fs')
var https = require('http');
var dataList = JSON.parse(fs.readFileSync('./index.json', 'utf8'));
const datalen = Object.keys(dataList).length;
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mune', {
    title:"アイライブ",
    id:'＠t53942800',
    content:dataList,
    len:datalen
  });
});

module.exports = router;
