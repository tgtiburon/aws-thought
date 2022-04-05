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
      res.json(data.Items);
    }
  });
});

// Get a specific user's thoughts
router.get('/users/:username', (req, res) => {
  console.log(`Querying for thought(s) from ${req.params.username}.`);

  const params = {
    TableName: table,
    // specifies search criteria like WHERE in SQL
    // We could use < = << and between to find range of
    // values
    KeyConditionExpression: '#un = :user',
    // Sets up aliases
    // #un is username etc.
    // can't use time, date, user, so make aliases
    ExpressionAttributeNames: {
      '#un': 'username',
      '#ca': 'createdAt',
      '#th': 'thought'
    },
    // AttributeValue can also have alias
    // :user for req.params.username
    ExpressionAttributeValues: {
      ':user': req.params.username,
    },
    // which columns to return
    ProjectionExpression: '#th, #ca',
    // false so descending order
    ScanIndexForward: false, 
  }
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err,null,2));
    } else {
      console.log("Query Succeeded.");
      res.json(data.Items);
    }
  });
});


// Create a new user at /api/users
router.post('/users', (req, res) => {
  const params = {
    TableName: table,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      thought: req.body.thought,
    },
  };
  // database call
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(500).json(err); //Error occured
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.json({"Added": JSON.stringify(data,null, 2)});
    }
  });

})

module.exports = router;
