'use strict';

var tDao = require('../dao/TestDao');

function testDao(req,res){
	console.log(req.user)
	tDao.find();
	res.send('hello world');
}

module.exports={
	testDao:testDao
}