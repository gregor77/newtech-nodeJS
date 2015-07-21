var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require("express-session");
// "/" 요청 라우팅
var routes = require('./routes/index');
// 파일 업로드 처리하기 위한 모듈 
var multer = require("multer");
// mongodb 접속 설정 모듈 
var configDB = require("./config/database.js");

//인증을 하기 위한 모듈 
var passport=require("passport"); 
// res.redirect() 했을때 특정 데이터를 가지고 갈수 있도록 하는 모듈
var flash=require("connect-flash");
// express app 객체 얻어오기 
var app = express();


// ejs 모듈을 사용하기 위한 설정
var ejs=require("ejs");
//해석을 할때 여는 기호와 닫는 기호를 [%  와  %] 로 설정하기 
//ejs.open="[%";
//ejs.close="%]";
app.engine(".html", ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon());
//개발이 끝난후 주석처리 한다.
app.use(logger('dev'));
// body 에 전달되는 파라미터를 추출하기 위한 미들웨어  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// 쿠키와 세션을 사용하기 위한 미들웨어 
app.use(cookieParser("kimgura"));
app.use(session({
    secret:"express-template",
    saveUninitialized: true,
    resave: true
}));
// 외부 공개 폴더의 경로를 설정하기 위한 미들 웨어 
app.use(express.static(path.join(__dirname, 'public')));

//파일 업로드 폴더 경로 설정하기 위한 미들 웨어  
app.use(multer({dest:"./upload/"}));
//인증을 위한 미들웨어 설정  
app.use(passport.initialize());
app.use(passport.session());
// flash 메세지를 사용하기위한 미들웨어 
app.use(flash());

/* passport 모듈 초기화  
require("./config/initPassport.js")(passport);
*/

// "/" 하위 요청 라우팅 
app.use('/', routes);

/*
// "/test" 요청 처리 
app.use('/test', function(req, res){
	//test ok! 문자열 응답하기 
	res.end("test ok!");
});

app.use('/test2', function(req, res){
	//응답 헤더 설정 
	res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
	//html 응답하기 
	res.end("<h1>test2 ok!</h1>");
});

//json 문자열 응답1
app.use('/test3', function(req, res){
	var menber = {num:1, name:"dwayne"};
	res.writeHead(200, {"Content-Type" : "application/json;charset=utf-8"});
	// Object를 문자열로 바꿔서 응답한다.
	res.end(JSON.stringify(menber));
});

//json 문자열 응답2
app.use('/test4', function(req, res){
	var menber = {num:1, name:"dwayne"};
	res.json(menber);
});

//xml 응
app.use('/test5', function(req, res){
	res.writeHead(200, {"Content-Type" : "text/xml;charset=utf-8"});
	var xml = "<?xml version='1.0' encoding='utf-8' ?>";
	xml += "<items>";
	xml += "<name>박성진</name>";
	xml += "</items>";
	res.end(xml);
});
*/

// routes /test.js require 하기 
var test = require("./routes/test");
app.get("/test", test.test1);
app.get("/test2", test.test2);
app.get("/test3", test.test3);
app.get("/test4", test.test4);
app.get("/test5", test.test5);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error 다루기

// dev 모드에서 에러처리 
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
