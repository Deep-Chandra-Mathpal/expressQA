var express = require('express');
var router = express.Router();
const pool = require('../database');

/* GET users listing. */

router.get('/', function (req, res, next) {
  pool.getConnection((err, conn) => {
    conn.query('SELECT q_id, question FROM q_table;', function (err, result) {
      conn.release();
      if (err) throw err
      res.render('question', { title: 'Questions', questions: result });
    })
  })
})

module.exports = router;
