/**
 * New node file
 */
//로그인 폼 요청처리 
exports.signinform = function(req, res){
	var redirectUrl = req.query.redirectUrl;
	var msg = req.flash("msg");
	
	res.render("auth/signinform", {"redirectUrl" : redirectUrl, "msg" : msg});
};

//로그인 요청 처리 
exports.signin = function(req, res){
	//입력한 아이디와 비밀버호를 얻어온다.
	var user = req.body.user;
	var pwd = req.body.pwd;
	var redirectUrl = req.body.redirectUrl;
	if (user === "dwayne" && pwd === "1234" ) {	//맞는 회원정보라고 가정 
		// 세션에 사용자 정보를 담는다.
		req.session.user = user;
		if (redirectUrl != undefined) {
			res.redirect(redirectUrl);	//원래 가려는 곳을  redirect
		} else {
			res.redirect("/");	//index page로 
		}
	} else {
		res.end("auth fail!!");
	}
};

//로그아웃 요청 처리 
exports.signout = function(req, res){
	delete req.session.user;
	res.redirect("/");
};