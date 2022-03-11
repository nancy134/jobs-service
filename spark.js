const axios = require('axios');
const utilities = require('./utilities');

exports.getContacts = function(accessToken, page){
    var url = process.env.SPARK_SERVICE + "/contacts?_pagination=1";

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
        console.log(result.data);

        if (result.data.D.Pagination.TotalPages < page){
            exports.getContacts(accessToken, ++page)
        } else {
            ;
        }
    }).catch(function(err){
        console.log(utilities.processAxiosError(err));
    });
}

