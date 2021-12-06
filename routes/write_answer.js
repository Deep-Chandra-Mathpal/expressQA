var express = require('express');
var router = express.Router();
const pool = require('../database');

var q_id;

router.get('/', function(req, res, next) {
    session=req.session;
    if(req.session.loggedin == true) {
        res.render('write_answer', { title: 'write your answer', question_id: req.query.id });
        q_id = parseInt(req.query.id);
    }
    else {
        res.redirect('/login');
    }
});

router.post('/', function (req, res, next) {
    var answer = req.body.answer;
    console.log(answer);
	if (answer.length>0) {
        session=req.session;
            if(req.session.loggedin == true) {
                pool.getConnection(function(err, conn){
                conn.query('insert into a_table values(?,?,?)', [q_id, req.session.u_id, answer], function(error, results, fields) {
                    conn.release();
                if(error != null){
                    res.send("<h3>sorry, you can answer only once<h3>");
                }
                else{
                    res.redirect(`/answer?id=${q_id}`);
                }
				res.end();
                });
            });
        }
        else {
            res.redirect('./login');
        }
	} else {
		res.send('please write answer');
		res.end();
	}
});

module.exports = router;
