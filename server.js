const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

const aws = require("aws-sdk");
const snsService = require('./sns');
const url = require('url');

//const sqsService = require('./sqs');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const utilities = require('./utilities');

const sparkService = require('./spark');

const constantService = require('./constant');

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
            var toDeleteList = [];
            for (var i=0; i<s3Data.MaxKeys; i++){
                var toDelete = {
                    Key: s3Data.Contents[i].Key
                };
                toDeleteList.push(toDelete);
            }
            var deleteParams = {
                Bucket: process.env.S3_BUCKET_MAIL_TEMPLATES,
                Delete: {
                    Objects: toDeleteList
                }
            }
            s3.deleteObjects(deleteParams, function(s3DeleteErr, s3DeleteData){
                if (s3DeleteErr){
                    res.send(s3DeleteErr);
                } else {
                    res.send(s3DeleteData);
                }
            });
        }
    });

});

app.get('/syncUsers', (req, res) => {
    res.send("syncUsers");
});

app.get('/playUsers', (req, res) => {
    res.send("playUsers");
});

app.get('/playBillingEvents', (req, res) => {
    res.send("playBillingEvents");
});


app.post('/cc/syncContacts', (req, res) => {
    var urlParts  = url.parse(req.url);
    var queryStr = urlParts.query;
    token = utilities.getToken(req);
    constantService.getContacts(token, req.body.spark_access_token, queryStr);
    res.send("sync started")
});



app.post('/spark/syncContacts', (req, res) => {
    token = utilities.getToken(req);
    constantService.findOrCreateCustomField(req.body.cc_access_token).then(function(customField){
        var page = 1;
        sparkService.getContacts(token, page);
        res.send("sync started");
    }).catch(function(err){
        res.send(err);
    });
});



app.listen(PORT, HOST);
