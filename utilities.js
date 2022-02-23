exports.getToken = function(req){
    var authorization = req.get("Authorization");
    if (!authorization) return "noAuthorizationHeader";
    var array = authorization.split(" ");
    var token = array[1];
    return token;
}

exports.createSparkHeaders = function(accessToken){
    var bearerToken = "Bearer " + accessToken;
    var headers = {
        "Authorization" : bearerToken
    };
    return headers;
}

exports.createConstantHeaders = function(accessToken){
    var bearerToken = "Bearer " + accessToken;
    var headers = {
        "Authorization" : bearerToken
    };
    return headers;
}

exports.processAxiosError = function(error){
    if (error.response){
        return(error.response.data);
    } else if (error.request){
        return(error.request);
    } else {
        return(error.message);
    }
}

exports.getCCSyncData = function(accessToken, contacts){

    var toSync = [];
    for (var i=0; i<contacts.length; i++){
        var c = contacts[i];

        var contact = {
            token: accessToken,
            email: c.email_address.address,
            first: c.first_name,
            last: c.last_name
        };

        for (var j=0; j<c.phone_numbers; j++){
            if (c.phone_numbers[i].kind === "home"){
                contact.phone_home = c.phone_numbers[i].phone_number;
            } else if (c.phone_numbers[i].kind === "work"){
                contact.phone_work = c.phone_numbers[i].phone_number;
            } else if (c.phone_numbers[i].kind === "mobile"){
                contact.phone_mobile = c.phone_numbers[i].phone_number;
            } else if (c.phone_numbers[i].kind === "other"){
                contact.phone_other = c.phone_numbers[i].phone_number;
            }
        }
        toSync.push(contact);
    }
    return toSync;
}