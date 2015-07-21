/*

var mongoose=require("mongoose");
//비밀번호 암호화를 위한 모듈
var bcrypt   = require('bcrypt-nodejs');

var Schema=mongoose.Schema;
//회원정보를 저장할 스키마 정의하기 
var userSchema=new Schema({
	local:{
		email:String,
		password:String
	},
	facebook:{
        id:String,
        token:String,
        email:String,
        name:String
    },
    twitter:{
        id:String,
        token:String,
        displayName:String,
        username:String
    },
    google:{
        id:String,
        token:String,
        email:String,
        name:String
    }
});
//암호화된 password를 리턴받는 함수 
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//암호화된 password와 인자로 전달된 password 를 비교해서 
//일치하면 true , 일치하지 않으면 false 를 리턴해주는 함수  
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);

*/