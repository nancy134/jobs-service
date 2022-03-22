const axios = require('axios');
const utilities = require('./utilities');
const snsService = require('./sns');
const syncService = require('./sync');

exports.getContacts = function(accountId, spark_accessToken, cc_accessToken, customField, page){

    var url = process.env.SPARK_SERVICE + "/contacts";

    if (page){
        url += "?page=" + page;
    }
    var headers = utilities.createSparkHeaders(spark_accessToken);
    var options = {
        url: url,
        method: 'GET',
        headers: headers
    };
    axios(options).then(function(result){
        toSync = utilities.getSparkSyncData(cc_accessToken, customField, result.data.D.Results);
        snsService.syncSparkContacts(toSync);
        if (page < result.data.D.Pagination.TotalPages){
            page += 1;
            exports.getContacts(accountId, spark_accessToken, cc_accessToken, customField, page);

        } else {
            var date = new Date().toISOString();
            var body = {
                accountId: accountId,
                service: "Spark"
            }
            syncService.findAndUpdate(body, date).then(function(sync){
                ;
            }).catch(function(err){
                console.log(err);
            });
        }


    }).catch(function(err){
        console.log(utilities.processAxiosError(err));
    });
}


exports.getSystem = function(accessToken){
    return new Promise(function(resolve, reject){
        url = process.env.SPARK_SERVICE + "/system";
        var headers = utilities.createSparkHeaders(accessToken);
        var options = {
            url: url,
            method: 'GET',
            headers: headers
        }
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            console.log(err);
            reject(utilities.processAxiosError(err));
        });
    });
}

