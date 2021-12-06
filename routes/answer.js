var express = require('express');
var router = express.Router();
const pool = require('../database');

/* GET users listing. */

router.get('/', function (req, res, next) {
    pool.getConnection(function(err, conn){
    conn.query('SELECT answer FROM a_table WHERE q_id = ?;',[req.query.id], function (err, result) {
    if (err) throw err
    res.render('answer', { title: 'Answer', answer: result, question_id: req.query.id });
  });
  });

});

module.exports = router;
