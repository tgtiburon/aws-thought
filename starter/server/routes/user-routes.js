const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');

const awsConfig = {
  region: 'us-east-2',
  //endpoint: "http://localhost:8000"
};
AWS.config.update(awsConfig);
// We use documentClient class to use
// native js objects to interface with
// dynamodb object
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = 'Thoughts';

router.get('/users', (req, res) => {
  const params = {
    TableName: table,
  };
  // Scan returns all items in the table
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err); // an error occurred
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
