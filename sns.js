const AWS = require('aws-sdk');
const ccService = require('./constant');
AWS.config.update({region: 'us-east-1'});
const syncContactTopicARN = process.env.AWS_SNS_SYNC_CC_CONTACT_TOPIC
const syncSparkContactTopicARN = process.env.AWS_SNS_SYNC_SPARK_CONTACT_TOPIC


exports.syncCCContacts = function(contacts){
    for (var i=0; i<contacts.length; i++){
        var c = contacts[i];

        var data = createSNSData(c);

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

        var data = createSNSData(c);
        data.sparkId = c.sparkId;
        data.customFieldId = c.customFieldId;


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


 function createSNSData(c){
    var data = {};
    if (c.token) data.token = c.token;
    if (c.email) data.email = c.email;
    if (c.first) data.first = c.first;
    if (c.middle) data.middle = c.middle;
    if (c.last) data.last = c.last;
    if (c.phone_work) data.phone_work = c.phone_work;
    if (c.phone_mobile) data.phone_mobile = c.phone_mobile;
    if (c.phone_other) data.phone_other = c.phone_other;
    if (c.phone_home) data.phone_home = c.phone_home;
    if (c.phone_primary) data.phone_primary = c.phone_primary;
    if (c.phone_pager) data.phone_pager = c.phone_pager;
    
    if (c.home_street) data.home_street = c.home_street;
    if (c.home_city) data.home_city = c.home_city;
    if (c.home_state) data.home_state = c.home_state;

    if (c.work_zip) data.work_zip = c.work_zip;
    return data;
 
    if (c.work_street) data.work_street = c.work_street;
    if (c.work_city) data.work_city = c.work_city;
    if (c.work_state) data.work_state = c.work_state;
    if (c.work_zip) data.work_zip = c.work_zip;
 
 }


