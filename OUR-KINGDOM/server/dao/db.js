'use strict';

var logger = require('../logger/Logger');
var MongoClient = require('mongodb').MongoClient;

var testdbUrl = 'mongodb://localhost:27017';
MongoClient.connect(testdbUrl,function(err,client){
	if(err){
		throw err;
	}
	logger.server.trace(testdbUrl+' 连接成功！');
	module.exports.client=client;
});

