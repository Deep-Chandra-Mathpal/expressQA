var express = require('express');
var router = express.Router();
const db = require('../database');

/* GET users listing. */

router.get('/', function (req, res, next) {
    session=req.session;
    if(req.session.loggedin == true) {
        db.query('SELECT q_id, question FROM q_table where u_id = ?', [req.session.u_id], function(error, results, fields) {
        if (error) throw error
        res.render('question', { title: 'User Questions', questions: results })
        });
        }
    else {
         res.redirect('./login');
        }
});

module.exports = router;
