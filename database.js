var mysql = require('mysql2')
var fs = require('fs')
pool = mysql.createPool({
  host: 'expressqadb.mysql.database.azure.com',
  user: 'deepchandra@expressqadb',
  password: 'expressqadb@123',
  database: 'qa_schema',
  port: 3306,
  ssl:{ca:fs.readFileSync('BaltimoreCyberTrustRoot.crt.pem')}
});

module.exports = pool;