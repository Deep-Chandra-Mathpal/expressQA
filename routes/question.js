var express = require('express');
var router = express.Router();
const db = require('../database');

/* GET users listing. */

router.get('/', function (req, res, next) {
  db.query('SELECT q_id, question FROM q_table;', function (err, result) {
    if (err) throw err
    res.render('question', { title: 'questions', questions: result });
  })

})

module.exports = router;
