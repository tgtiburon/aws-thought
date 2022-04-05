// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const { v4: uuid4 } = require("uuid");
// Configure the region
AWS.config.update({ 
  region: "us-east-2",
  //endpoint: "http://localhost:8000" 
});

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Create the params for calling createBucket
var bucketParams = {
  Bucket: "user-images-" + uuid4(),
};

// call s3 to create the bucket
s3.createBucket(bucketParams, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success");
  }
});
