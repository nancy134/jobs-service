const axios = require('axios');
const utilities = require('./utilities');

exports.getContacts = function(accessToken){
    return new Promise(function(resolve, reject){
        var url = process.env.SPARK_SERVICE + "/contacts";
        var headers = utilities.createSparkHeaders(accessToken);
        var options = {
            url: url,
            method: 'GET',
            headers: headers
        };
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(utilities.processAxiosError(err));
        });
    });
}