var express = require('express');
var router = express.Router();
const db = require('../database');

/* GET users listing. */

router.get('/', function (req, res, next) {
    db.query('SELECT answer FROM a_table WHERE q_id = ?;',[req.query.id], function (err, result) {
    if (err) throw err
    res.render('answer', { title: 'answer', answer: result, question_id: req.query.id });
  })

})

module.exports = router;
