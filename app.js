const {Client} = require('twitter-api-sdk');
const da=[]
const fs = require("fs")
const client = new Client(`AAAAAAAAAAAAAAAAAAAAACUxlgEAAAAAqHdwskPX35WvtwWRWKydMy9SXRs%3DzEftpbowObJcdrDU9Q4rvq25RjeSGqd2YDvGOOzb4D0FvUfaAw`);
let  {parseUrl, getDetailsConcise} = require("twitter-url");
const userName = "t53942800";
var bb="co";
const data = fs.readFileSync('index.json', 'utf8');
const resArray = JSON.parse(data);
(async () => {
    const { data } = await client.users.findUserByUsername(userName);
    //console.log(data)
    const tweets = client.tweets.usersIdTweets(data.id);
    //console.log(tweets)
    for await (const page of tweets) {
      if(bb==0){
        break;
      }
      //console.log(page)
      for await (const p of page.data){
        const url = await "https://twitter.com/t53942800/status/"+p.id
        if(bb!=0){
          try {
            await we(url)
          }catch (error) {
            console.log("動画なし")
          }
        }else{
          break;
        }
      }
    }
    var json_text = await JSON.stringify(resArray);
    await fs.writeFileSync('index.json',json_text, 'utf8');
})();

async function we(url){
  let {id} = await parseUrl(url);
  let  details = await getDetailsConcise(id);
  if(resArray.length != 0){
    const result = resArray.some((u) => u.thumbnail === details.thumbnail);
    if(result){
      console.log('存在します')
      bb = await 0
    }else{
      try {
        await resArray.push(details)
        console.log('挿入しました')
      }catch (error) {
        console.log("動画なし")
      }
    }
  }else{
    try {
      await resArray.push(details)
      console.log('挿入しました')
    }catch (error) {
      console.log("動画なし")
    }
  }
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
//app.use('/us', usersRouter);
//var dataList = JSON.parse(fs.readFileSync('./index.json', 'utf8'));
//// 写真リストを取得するAPI
//app.get("/api/data/list", function(req, res, next){
//    res.json(dataList);
//});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("listening server")
})

module.exports = app;
