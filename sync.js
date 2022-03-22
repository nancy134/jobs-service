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


exports.findOrCreateSync = function(body){
    return new Promise(function(resolve, reject){
        models.Sync.findOne({where: body}).then(function(sync){
            if (!sync){
                exports.createSync(body).then(function(sync2){
                    resolve(sync2);
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


exports.updateSync = function(id, body){
    return new Promise(function(resolve, reject){
        var options = {
            returning: true,
            where: {id: id}
        }
        models.Sync.update(body, options).then(function(sync){
            if (!sync[0]){
                reject({message: "No records updates"});
            } else {
                resolve(sync[1][0]);
            }
        }).catch(function(err){
            reject(err);
        });
    });
}


exports.findAndUpdate = function(body, date){
    return new Promise(function(resolve, reject){
        models.Sync.findOne({where: body}).then(function(sync){
            if (sync){
                body.updateComplete = date; 
                exports.updateSync(sync.id, body).then(function(sync){
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

