var db = require('./db');
function find(){
	db.client.db('testdb').collection('users').find({}).toArray(function(err,docs){
		if(err){
			throw err;
		}
		console.log(docs)
	});
}
module.exports={
		find:find
}