const axios = require('axios');
const utilities = require('./utilities');
const snsService = require('./sns');


exports.getContacts = function(spark_accessToken, cc_accessToken, customField, page){
    var url = process.env.SPARK_SERVICE + "/contacts";

    if (page){
        url += "?page=" + page;
    }
    console.log("url: "+url);
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
            exports.getContacts(spark_accessToken, page);
        } else {
            ;
        }


    }).catch(function(err){
        console.log(utilities.processAxiosError(err));
    });
}
