const models = require("./models");

exports.createSync = function(body){
    return new Promise(function(resolve, reject){
        models.Sync.create(body).then(function(sync){
            resolve(sync);
        }).catch(function(err){
            reject(err);
        });
    });
}
