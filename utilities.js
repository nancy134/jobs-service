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

        var phoneLength = 0;
        if (c.phone_numbers) phoneLength = c.phone_numbers.length;
        for (var j=0; j<c.phoneLength; j++){

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

        var addressLength = 0;
        if (c.street_addresses) addressLength = c.street_addresses.length;
        for (var k=0; k<addressLength; k++){
            
            if (contact.street_addresses[k].kind === "home"){
                c.address_home_street = contact.street_addresses[k].street;
                c.address_home_city = contact.street_addresses[k].city;
                c.address_home_state = contact.street_addresses[k].state;
                c.address_home_zip = contact.street_addresses[k].postal_code;
                c.address_home_country = contact.street_addresses[k].country;
            } else if (contact.street_addresses[k].kind === "work"){
                c.address_work_street = contact.street_addresses[k].street;
                c.address_work_city = contact.street_addresses[k].city;
                c.address_work_state = contact.street_addresses[k].state;
                c.address_work_zip = contact.street_addresses[k].postal_code;
                c.address_work_country = contact.street_addresses[k].country;
            } else if (contact.street_addresses[k].kind === "other"){
                c.address_other_street = contact.street_addresses[k].street;
                c.address_other_city = contact.street_addresses[k].city;
                c.address_other_state = contact.street_addresses[k].state;
                c.address_other_zip = contact.street_addresses[k].postal_code;
                c.address_other_country = contact.street_addresses[k].country;
            }
        }
        toSync.push(contact);

    }
    return toSync;
}
exports.getSparkSyncData = function(accessToken, customField, contacts){

    var length = contacts.length;
    var toSync = [];
    for (var i=0; i<length; i++){
        var contact = {
            token: accessToken,
            email: contacts[i].PrimaryEmail,
            first: contacts[i].GivenName,
            middle: contacts[i].MiddleName,
            last: contacts[i].FamilyName,
            phone_work: contacts[i].WorkPhoneNumber,
            phone_mobile: contacts[i].MobilePhoneNumber,
            phone_other: contacts[i].OtherPhoneNumber,
            phone_home: contacts[i].HomePhoneNumber,
            phone_primary: contacts[i].PrimaryPhoneNumber,
            phone_pager: contacts[i].PagerPhoneNumber,

            address_home_street: contacts[i].HomeStreetAddress,
            address_home_city: contacts[i].HomeLocality,
            address_home_state: contacts[i].HomeRegion,
            address_home_zip: contacts[i].HomePostalCode,
            address_work_street: contacts[i].WorkStreetAddress,
            address_work_city: contacts[i].WorkLocality,
            address_work_state: contacts[i].WorkRegion,
            address_work_zip: contacts[i].WorkPostalCode,
            
            sparkId: contacts[i].Id,
            customFieldId: customField.custom_field_id
        };
        toSync.push(contact);
    }
    return toSync;    
}

