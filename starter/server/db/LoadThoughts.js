// interface with DynamoDB
const AWS = require('aws-sdk');
// File system for users.json
const fs = require('fs');

AWS.config.update({
  region: 'us-east-2',
  //endpoint: "http://localhost:8000"
});

// DocumentClient allows us to use JS objects as arguments
// and return native js types.
// This helps map objects which reduces impedance mismatching
// and speeds up the dev process

const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
});

// Read users.json and assign to the allUsers object
console.log("Importing thoughts into DynamoDB.  Please wait.");
const allUsers = JSON.parse(
  fs.readFileSync("./server/seed/users.json", "utf-8")
);

allUsers.forEach((user) => {
  const params = {
    TableName: "Thoughts",
    Item: {
      "username": user.username,
      "createdAt": user.createdAt,
      "thought": user.thought,
    }
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add thought",
        user.username,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:", user.username);
    }
  });
});
