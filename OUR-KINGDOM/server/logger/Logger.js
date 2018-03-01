'use strict';

var log4js = require("log4js");
var log4js_config = require("../../config/log4js.json");
log4js.configure(log4js_config);
log4js.getLogger().info('logger load......');

module.exports=function(){
	
	return {
		server:log4js.getLogger("server"),
		app:log4js.getLogger("app")
	}

}