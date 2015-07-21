/**
 * New node file
 */

// 가상의 DB
 var members = [];

// post 방식 전송 파라미터 추
exports.insert = function(req, res) {
	// post 전송 파라미터는 req.body에 있다.
	var num = req.body.num;
	var name = req.body.name;
	var addr = req.body["addr"];
	//회원정보를 plain object에 담는다.
	var member = {"num" :num, "name" :name, "addr" :addr};
	//가상의 DB에 저장
	members.push(member);
	//콘솔에 출력해보기
	console.log(members);
	//임시 응답
	//res.end("insert ok!");
	
	//flash 메세지를 request에 담는다.
	req.flash("msg", "회원정보 추가 성공!");		//key, value
	res.redirect("/member/list");
};

// get 방식 "/member/list" 요청 처리 
exports.list = function(req, res) {
	//DB에서 회원 목록을 얻어와서
	
	//flash 메세지 읽어오기
	var msg = req.flash("msg");
	
	//동적인 페이지를 출력할 수 있는 페이지를 이동해서 출력한다. 
	res.render("member/list", {"members":members, "msg":msg});	//views/member/list.html을 렌더링 한다.
};