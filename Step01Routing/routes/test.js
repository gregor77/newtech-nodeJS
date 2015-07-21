/**
 * New node file
 */
exports.test1 = function(req, res){
	//test ok! 문자열 응답하기 
	res.end("test1 ok!");
};
exports.test2 = function(req, res){
	//응답 헤더 설정 
	res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
	//html 응답하기 
	res.end("<h1>test2 ok!</h1>");
};
exports.test3 = function(req, res){
	var menber = {num:1, name:"dwayne"};
	res.writeHead(200, {"Content-Type" : "application/json;charset=utf-8"});
	// Object를 문자열로 바꿔서 응답한다.
	res.end(JSON.stringify(menber));
};
exports.test4 = function(req, res){
	var menber = {num:1, name:"dwayne"};
	res.json(menber);
};
exports.test5 = function(req, res){
	res.writeHead(200, {"Content-Type" : "text/xml;charset=utf-8"});
	var xml = "<?xml version='1.0' encoding='utf-8' ?>";
	xml += "<items>";
	xml += "<name>박성진</name>";
	xml += "</items>";
	res.end(xml);
};