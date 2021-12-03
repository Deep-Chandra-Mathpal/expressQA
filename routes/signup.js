var express = require('express');
var router = express.Router();
var session = require('express-session');
const db = require('../database');

/* GET users listing. */

router.get('/', function(req, res, next) {
	res.render('signup');
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
        db.query('select * from accounts where username = ?', [username], function(error, results, fields){
        if(!(results.length > 0)){
		db.query('insert into accounts(username, password) values(?,?)', [username, password], function(error, results, fields) {
			if (!error) {
				res.redirect('/login');
			} else {
				res.send('server problem');
			}			
			res.end();
		});
        }
        else{
            res.send('username already exist');
        }
        });
        
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})

module.exports = router;
