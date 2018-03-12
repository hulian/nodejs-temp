'use strict';

//测试DAO
var logger = require('../../logger/Logger');
var db = require('../db');

function find(){
	db.client.db('testdb').collection('users').find({}).toArray(function(err,docs){
		if(err){
			throw err;
		}
		logger.app.debug(docs);
	});
}

module.exports={
	find:find
};