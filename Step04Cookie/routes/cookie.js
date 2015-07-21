/**
 * New node file
 */
// 쿠키 추가 예제 
exports.add = function(req, res) {
	//폼 전송된 내용
	var msg = req.body.msg;
	//쿠키 심기
	res.cookie("msg", msg, {maxAge:10000});
	res.redirect("/cookie/read");
};

// 쿠키 읽기 예제
exports.read = function(req, res) {
	//쿠키에 저장된 내용을 읽어온다.
	var msg = req.cookies.msg;
	res.render("cookie/readcookie", {"msg":msg});
};