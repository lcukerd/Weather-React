var request = require('request');

// Google places API details
const places_API = "";
// Heroku link prepended to avoid cors issue
const places_base = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?key=";

// Apixu Weather API details
const weather_API = "67998f895c544e2fbea145703191705";
const weather_base_forecast = "http://api.apixu.com/v1/forecast.json?key=";
const weather_base_history = "http://api.apixu.com/v1/history.json?key=";

// Function to make Google places request and handle callback
exports.queryAutoComplete = (text, handler) => {
    request(places_base + places_API + "&input=" + text, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Callback
            handler(JSON.parse(response.body));
        }
        else {
            console.log(response.statusCode + " " + error);
        }
    })
};

// Function to request forecast for given place
exports.getForecast = (text, handler) => {
    console.log(weather_base_forecast + weather_API + "&q=" + text + "&days=4");

    request(weather_base_forecast + weather_API + "&q=" + text + "&days=4", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Callback
            handler(JSON.parse(response.body));
        }
        else {
            console.log(response.statusCode + " " + error);
            handler(response.statusCode);
        }
    })
};

// Function to request history for given place
exports.getHistory = (text, handler) => {
    // 7 iterative requests for each day is made separately because history data for more
    // than 1 day per request is not allowed for demo account.
    for (let i = 0; i < 7; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        console.log(weather_base_history + weather_API + "&q=" + text + "&dt=" + d.toISOString());

        request(weather_base_history + weather_API + "&q=" + text + "&dt=" + d.toISOString(), function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Callback
                handler(JSON.parse(response.body), i);
            }
            else {
                console.log(response.statusCode + " " + error);
            }
        })
    }
};