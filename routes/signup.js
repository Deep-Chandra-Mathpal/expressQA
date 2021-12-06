var express = require('express');
var router = express.Router();
var session = require('express-session');
const pool = require('../database');

/* GET users listing. */


router.get('/', function(req, res, next) {
	res.render('signup');
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		pool.getConnection(function(err, conn){
        conn.query('select * from accounts where username = ?', [username], function(error, results, fields){
        if(!(results.length > 0)){
		conn.query('insert into accounts(username, password) values(?,?)', [username, password], function(error, results, fields) {
			if (!error) {
				res.redirect('/status?trace=from_sign_up');
			} else {
				res.send('server problem');
			}			
			res.end();
		});
        }
        else{
            res.redirect('/status?trace=from_sign_up_bad_req');
        }
		conn.release();
        });
	});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})

module.exports = router;
