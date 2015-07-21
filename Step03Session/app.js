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

var auth = require("./routes/auth");

// 회원가입 폼 요청 처리 
app.get("/auth/signinform", auth.signinform);

// 로그인 요청 처리 
app.post("/auth/signin", auth.signin);

// 로그아웃 처
app.get("/auth/signout", auth.signout);

/*
app.get("/play/playspace", function(req, res) {
	var user = req.session.user;
	if (user === undefined) {
		res.redirect("/auth/signinform");
	} else {
		res.end(user + " ! let's play");
	}
});
*/

var play = require("./routes/play");
app.get("/play/*", isLogedIn, play);
/*
app.get("/play/*", isLogedIn, function(req, res){
	res.render("play/playspace", {user:req.session.user});
});
*/

//로그인을 하였는지 인증하는 함수
function isLogedIn(req, res, next) {
	var user = req.session.user;
	console.log(req.route.path);	//원래 요청된 url을 읽어올 수 있다. 
	if (user === undefined) {
		req.flash("msg", "해당 컨텐츠는 로그인이 필요합니다.");
		//원본 요청 url 주소 읽어오기. req.route.path를 하면, 원본 요청 url이 아닌, play/*가 리턴된다.
		var redirectUrl = req.originalUrl;
		res.redirect("/auth/signinform?redirectUrl="+redirectUrl);
	} else {
		next();	//다음 작업을 수행...
	}
}

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
