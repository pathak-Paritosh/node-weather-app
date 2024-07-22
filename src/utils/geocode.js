const request = require("postman-request");

const geocode = (city, country, callback) => {
    const url = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`;
    const apiKey = "+WOkRhmDVzfUChs+kLGxlw==gKCXznHXCtBKAtYV";
    const options = {
        url,
        headers: {
            'X-Api-Key': apiKey
        },
        json: true
    };
    request(options, (error, response) => {
        if(error || response.body.error || response.body.length==0){
            callback("Some error occured", undefined);
        }
        else{
            callback(undefined, response.body[0]);
        }
    })
};

module.exports = {
    geocode
}