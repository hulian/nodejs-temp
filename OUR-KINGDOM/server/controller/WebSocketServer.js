'use strict';
	
var logger = require('../logger/Logger');
var SocketIo = require('socket.io');
var socketioJwt = require('socketio-jwt');
var config = require('config');
var authenticationManager = require('../authentication/AuthenticationManager');
var io = new SocketIo();

		
io.use(socketioJwt.authorize({
	secret: config.get('tokenKey'),
	handshake: true
}));

		
io.on('connection', function(socket){
	logger.app.trace('a user connected');
				
	socket.on('command',function(data,fn){
					
		logger.app.trace('command message:'+JSON.stringify(data));
					
		var req={
			user:socket.decoded_token,
			originalUrl:data.command
		};
					
		var res={
			send:fn	
		};
					
		switch(data.command){
					
		//所有WEBSOCKET API在此声明
		case 'testDao':
			if(!authenticationManager.verifyRoles(req,res,req.user,['user'])){
				fn('403');
				return;
			}
			return require('./test/TestController').testDao(req,res);
							
		}
					
	});
});
		
		

module.exports = function(httpServer){
	io.listen(httpServer);
	return io;
};
