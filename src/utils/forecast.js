const request = require("postman-request");

const forecast = (lat, long, callback) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=Metric&appid=1c2fc5f3288c6e715a0c45de7c50b2fd`;

    request({url, json: true}, (error, response) => {
        if(error || response.body.cod !== 200){
            callback("Some error occured!", undefined);
        }
        else{
            callback(undefined, response.body);
        }
    });
};

module.exports = {
    forecast
}