const AWS = require('aws-sdk');
const ccService = require('./constant');
AWS.config.update({region: 'us-east-1'});
const syncContactTopicARN = process.env.AWS_SNS_SYNC_CC_CONTACT_TOPIC

exports.syncCCContacts = function(contacts){
   for (var i=0; i<contacts.contacts.length; i++){
       var c = contacts.contacts[i];
       console.log(c.email_address.address);
   }
}
