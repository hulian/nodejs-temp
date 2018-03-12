'use strict';
var logger = require('./server/logger/Logger');
var cluster = require('cluster');

if (cluster.isMaster) {
	
	// Start workers and listen for messages containing notifyRequest
	var numCPUs = require('os').cpus().length;
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
  
	cluster.on('listening',function(worker,address){
		logger.server.info('listening: worker ' + worker.process.pid +', Address: '+address.address+':'+address.port);
	});

	cluster.on('exit', function(worker) {
		logger.server.info('worker ' + worker.process.pid + ' died');
	});  

} else {
	require('./app');
}






