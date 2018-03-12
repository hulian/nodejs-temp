'use strict';

var logger = require('../../logger/Logger');
var tDao = require('../../dao/test/TestDao');

function testDao(req,res){
	logger.app.debug(req.user);
	tDao.find();
	res.send('hello world');
}

module.exports={
	testDao:testDao
};