var express = require('express');
var router = express.Router();
var session = require('express-session');
const pool = require('../database');

/* GET users listing. */

router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/auth', function (req, res, next) {
    var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		pool.getConnection(function(err, conn){
		conn.query('select * from accounts where username = ? and password = ?', [username, password], function(error, results, fields) {
			conn.release();
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
                req.session.u_id = results[0].u_id;
				res.redirect('/status?trace=from_login'); 
                //res.send("<h3>now you are logged in, go back and ask question or give answer</h3>");
			} else {
				res.redirect('/status?trace=from_login_bad_req'); 
			}			
			res.end();
		});
	});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})

module.exports = router;
