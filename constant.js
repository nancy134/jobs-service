const axios = require('axios');
const utilities = require('./utilities');

exports.getContacts = function(accessToken, query){

    return new Promise(function(resolve, reject){
        
        url = process.env.CONSTANT_SERVICE + "/contacts";
        if (query) url += "?" + query;

        var headers = utilities.createConstantHeaders(accessToken);
        var options = {
            url: url,
            method: 'GET',
            headers: headers
        }
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(utilities.processAxiosError(err));
        });
    });
}

exports.getCustomField = function(accessToken){
    return new Promise(function(resolve, reject){
        url = process.env.CONSTANT_SERVICE + "/contact_custom_fields?name=flexmls_id";
        var headers = utilities.createConstantHeaders(accessToken);
        var options = {
            url: url,
            method: 'GET',
            headers: headers
        }
        axios(options).then(function(result){
            //console.log("get customField result.data:");
            //console.log(result.data);
            resolve(result.data);
        }).catch(function(err){
            console.log(err);
            reject(utilities.processAxiosError(err));
        });
    });
}

exports.createCustomField = function(accessToken){
    return new Promise(function(resolve, reject){
        url = process.env.CONSTANT_SERVICE + "/contact_custom_fields";
        var headers = utilities.createConstantHeaders(accessToken);
        var body = {
            label: "flexmls_id",
            type: "string"
        };
        var options = {
            url: url,
            method: 'POST',
            headers: headers,
            data: body
        }
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(utilities.processAxiosError(err));
        });
    });
}   

exports.findOrCreateCustomField = function(accessToken){
    return new Promise(function(resolve, reject){
        exports.getCustomField(accessToken).then(function(customField){
            //console.log(customField);
            if (customField && customField.name === "flexmls_id"){
                resolve(customField);
            } else {
                //console.log("create new custom field");
                exports.createCustomField(accessToken).then(function(newCustomField){
                    resolve(newCustomField);
                }).catch(function(err){
                    reject(utilities.processAxiosError(err));
                });
            }
        }).catch(function(err){
            reject(utilities.processAxiosError(err));
        });
    });
}


exports.syncContacts = function(accessToken, query){

    return new Promise(function(resolve, reject){
        url = process.env.JOBS_SERVICE + "/cc/syncContacts";
        if (query) url += "?" + query;

        var headers = utilities.createConstantHeaders(accessToken);
        var options = {
            url: url,
            method: 'GET',
            headers: headers
        }
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(utilities.processAxiosError(err));
        });
    });
}