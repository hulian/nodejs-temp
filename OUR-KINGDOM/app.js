'use strict';

var logger = require('./server/logger/Logger');

//使用CONFIG模块，加载默认文件夹CONFIG里的JSON配置
var config = require('config');
logger.server.info('配置 文件:'+JSON.stringify(config));

//创建REST框架
var framework = require('./server/controller/RestFramework');

//创建HTTP服务
var httpServer = require('http').createServer(framework.restApp);

//创建SOCKET服务
require('./server/controller/WebSocketServer')(httpServer);

//启动HTTP服务
var port = config.get('port');
httpServer.listen(port, function(){
	logger.server.info('服务器已启动,监听端口: ' + port);
});




