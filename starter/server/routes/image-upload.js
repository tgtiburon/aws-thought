const express = require('express');
const router = express.Router();
// middleware for multipart/form-data for images
const multer = require('multer');
const AWS = require('aws-sdk');
const paramsConfig = require('../utils/params-config');


const storage  = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    },
});
// Image is the key, single is only 1 image
const upload = multer({ storage }).single('image');

const s3 = new AWS.S3({ 
    apiVersion: '2006-03-01',
});

// api/image-upload
router.post('/image-upload', upload, (req, res) => {
    // setup params config
    const params = paramsConfig(req.file);

    // setup s3 service call
    s3.upload(params, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.json(data);
    });
});

module.exports = router;



