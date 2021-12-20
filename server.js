const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("jobs-service");
});

app.get('/expireMailPreview', (req, res) => {
    var params = {
        Bucket: process.env.S3_BUCKET_MAIL_TEMPLATES,
        MaxKeys: 5,
        Prefix: "mailPreview/"
    };
    s3.listObjects(params, function(s3Err, s3Data){
        if (s3Err){
            res.send(s3Err);
        } else {
            res.send(s3Data);
        }
    });

});

app.listen(PORT, HOST);