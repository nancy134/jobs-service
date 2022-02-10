const AWS = require('aws-sdk');
const ccService = require('./constant');
AWS.config.update({region: 'us-east-1'});
const syncContactTopicARN = process.env.AWS_SNS_SYNC_CC_CONTACT_TOPIC
const syncSparkContactTopicARN = process.env.AWS_SNS_SYNC_SPARK_CONTACT_TOPIC


exports.syncCCContacts = function(contacts){
    for (var i=0; i<contacts.length; i++){
        var c = contacts[i];

        var data = {
            token: c.token,
            email: c.email,
            first: c.first,
            last: c.last
        }

        var params = {
            Message: JSON.stringify(data),
            TopicArn: syncContactTopicARN
        }
        var publish = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
        publish.then(function(result){
            console.log(result);
        }).catch(function(err){
            console.log(err);
        });
    }
 }
 
 exports.syncSparkContacts = function(contacts){
    for (var i=0; i<contacts.length; i++){
        var c = contacts[i];
        console.log(c.email);

        var data = {
            token: c.token,
            email: c.email,
            first: c.first,
            last: c.last
        }

        var params = {
            Message: JSON.stringify(data),
            TopicArn: syncSparkContactTopicARN
        }
        var publish = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
        publish.then(function(result){
            console.log(result);
        }).catch(function(err){
            console.log(err);
        });
    }
 }