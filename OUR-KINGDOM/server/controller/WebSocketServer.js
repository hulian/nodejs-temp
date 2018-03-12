'use strict';
	
var logger = require('../logger/Logger');
var SocketIo = require('socket.io');
var socketioJwt = require('socketio-jwt');
var config = require('config');
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
			user:socket.decoded_token
		};
					
		var res={
			send:fn	
		};
					
		switch(data.command){
					
		//所有WEBSOCKET API在此声明
		case 'testDao':
			return require('./TestController').testDao(req,res);
							
		}
					
	});
});
		
		

module.exports = function(httpServer){
	io.listen(httpServer);
	return io;
};
