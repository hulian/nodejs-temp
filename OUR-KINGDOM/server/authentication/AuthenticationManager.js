'use strict';

//REST框架封装类
var logger = require('../logger/Logger');
var config = require('config');
var NodeCache = require('node-cache');
var nodecache = new NodeCache();
var jwt = require('jsonwebtoken');

function hasRole(roles){
	return function(req,res,next){
		
		if(!req.cookies.token){
			logger.server.trace('无访问权限，原因：没有TOKEN');
			res.send(403);
			return;
		}
		
		//解析用户信息
		var user = jwt.decode(req.cookies.token);
		req.user=user;
		logger.server.trace('解析用户信息成功:'+JSON.stringify(user));
		
		if(!verifyRoles(req,res,user,roles)){
			res.send(403);	
			return;		
		}

		next();
	};
}

function verifyRoles(req,res,user,roles){
			
	//从缓存检查结果
	var key = user.name+'-'+req.originalUrl;
	if(nodecache.get(key)===true){
		logger.server.trace('有权限访问,缓存key:'+key);
		return true;
	}else if(nodecache.get(key)===false){
		logger.server.trace('无权限访问,缓存key:'+key);
		return false;
	}
			
	//比较权限，并缓存果
	for(var i=0;i<user.roles.length;i++){
		for(var j=0;j<roles.length;j++){
			if(user.roles[i]===roles[j]){
				nodecache.set(key,true);
				return true;
			}
		}
	}
			
	nodecache.set(key,false);
	logger.server.trace('无访问权限,需要权限:'+roles+' 用户权限:'+user.roles);
	return false;
}

function createToken(user){
	return jwt.sign(user,config.get('tokenKey'));
}


module.exports={
	hasRole:hasRole,
	verifyRoles:verifyRoles,
	createToken:createToken
};
	
