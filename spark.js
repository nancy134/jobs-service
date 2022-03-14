const axios = require('axios');
const utilities = require('./utilities');

exports.getContacts = function(accessToken, page){
    var url = process.env.SPARK_SERVICE + "/contacts";

    if (page){
        url += "&_page=" + page;
    }

    var headers = utilities.createSparkHeaders(accessToken);
    var options = {
        url: url,
        method: 'GET',
        headers: headers
    };
    axios(options).then(function(result){
        console.log(result.data);

        console.log("result.data.D.Pagination.TotalPages: "+result.data.D.Pagination.TotalPages);
        console.log("page: "+page);
        if (result.data.D.Pagination.TotalPages < page){
            page += 1;
            console.log("get page: "+page)
            //exports.getContacts(accessToken, page);
        } else {
            ;
        }


    }).catch(function(err){
        console.log(utilities.processAxiosError(err));
    });
}

