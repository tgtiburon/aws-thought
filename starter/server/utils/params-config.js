const { v4: uuidv4 } = require('uuid');

const params = (fileName) => {

    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length -1];

    const imageParams = {
        Bucket: 'user-images-10a60d2c-8026-4277-b5dd-3fbee5089785',
        // gives unique filename
        Key: `${uuidv4()}.${fileType}`,
        Body: fileName.buffer,
    };
    return imageParams;
};

module.exports = params;

