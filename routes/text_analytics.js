var express = require('express');
var router = express.Router();
const pool = require('../database');

var keyPhrasesInput = [];

router.get('/', function(req, res, next) {
  pool.getConnection(function(err, conn){
  conn.query('select question from q_table', function(error, results, fields){
    if(error) throw error;
    conn.release();
  Object.keys(results).forEach(function(key) {
    var row = results[key];
    keyPhrasesInput.push(row.question);
  });
    "use strict";
    const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
  const key = 'b389faa9f18e4b408f1b8289d8e2c40d';
  const endpoint = 'https://expressqata.cognitiveservices.azure.com/';
  // Authenticate the client with your key and endpoint
  const textAnalyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));
  
  // Example method for extracting key phrases from text
  async function keyPhraseExtraction(client){
  
      const keyPhraseResult = await client.extractKeyPhrases(keyPhrasesInput); 
      res.render('text_analytics', {title: "KeyPhrases", keyphrases: keyPhraseResult});
  }
  keyPhraseExtraction(textAnalyticsClient);

  });
  keyPhrasesInput = [];
});
});

module.exports = router;
