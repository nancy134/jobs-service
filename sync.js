const models = require("./models");

exports.createSync = function(body){
    return new Promise(function(resolve, reject){
        models.Sync.findOne({where: body}).then(function(sync){
            resolve(sync);
        }).catch(function(err){
            reject(err);
        });
    });
}


exports.findOrCreateSync = function(body){
    return new Promise(function(resolve, reject){
        models.Sync.findOne(body).then(function(sync){
            if (!sync){
                exports.createSync(body).then(function(sync){
                    resolve(sync);
                }).catch(function(err){
                    reject(err);
                });
            } else {
                resolve(sync);
            }
        }).catch(function(err){
            reject(err);
        });
    });
}

