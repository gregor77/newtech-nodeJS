/**
 * New node file
 */
var express = require("express");
//라우터 객체를 얻어온다.
var router = express.Router();

router.get("/play/playspace", function(req, res){
	res.render("play/playspace", {"user":req.session.user});
});

router.get("/play/playspace2", function(req, res){
	
});

router.get("/play/playspace3", function(req, res){
	
});

module.exports = router;