const axios = require('axios');
const utilities = require('./utilities');

exports.getContacts = function(accessToken, page){
    return new Promise(function(resolve, reject){
        var url = process.env.SPARK_SERVICE + "/contacts";
        if (page){
            url += "?page="+page;
        }

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