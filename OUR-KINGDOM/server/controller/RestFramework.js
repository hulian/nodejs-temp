'use strict';

//REST框架封装类
var Express = require('express');
var restApp = new Express();

//获取环境变量，配置REST应用
restApp.use(Express.favicon());
restApp.use(Express.logger('dev'));
restApp.use(Express.cookieParser());
restApp.use(Express.static('client'));

//开发模式使用
if ('development' === restApp.get('env')) {
	restApp.use(Express.errorHandler());
}

//所有API在这里申明
var authenticationManager = require('../authentication/AuthenticationManager');
restApp.get('/login',require('./authentication/AuthenticationController').login);
restApp.get('/hasRole',authenticationManager.hasRole(['user1','admin','user']),require('./test/TestController').testDao);
//......

module.exports={
	restApp:restApp
};
