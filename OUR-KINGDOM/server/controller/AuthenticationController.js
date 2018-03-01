'use strict';

var logger = require('../logger/Logger')();
var authenticationManager = require('../authentication/AuthenticationManager')();

function login(req,res){
	logger.app.trace('login:'+req);
	var token=authenticationManager.createToken({"name":"test","roles":["user","test"]});
	res.cookie("token",token);
	res.send(token);
}

module.exports={
	login:login
};
