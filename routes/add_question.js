var express = require('express');
var router = express.Router();
const pool = require('../database');

var q_id;

router.get('/', function(req, res, next) {
    session=req.session;
    if(req.session.loggedin == true) {
        res.render('add_question', { title: 'ask question'});
        q_id = req.query.id;
    }
    else {
        res.redirect('/login');
    }
});

router.post('/', function (req, res, next) {
    var question = req.body.question;
	if (question.length>0) {
        session=req.session;
            if(req.session.loggedin == true) {
                pool.getConnection(function(err, conn){
                conn.query('insert into q_table(u_id,question) values(?,?)', [req.session.u_id, question], function(error, results, fields) {
                conn.release();
                res.redirect(`/question`);
				res.end();
                });
            });
            }
        else {
            res.redirect('./login');
        }
	} else {
		res.send('please ask question');
		res.end();
	}
});

module.exports = router;
