// Declared a varible to cache city search html line:24
let city = '';
// Create a varible declaration
let searchCity = $('#search-city');
let searchButton = $('#search-button');
let clearButton = $('#clear-history');
let currentCity = $('#current-city');
let currentTemperature = $('#temperature');
let currentHumidity = $('humidity');
let currentWindSpeed = $('#wind-speed');
let currentUvIndex = $('#uv-index');
let cityEl = [];
// four loop to search if cities exist within storage
function find (c) {
    for (var i = 0; i < cityEl.length; i++) {
        if(c.toUpperCase()=== cityEl[i]){
            return -1;
        }
    }
    return 1;
}
// Created API Key
const APIKey = '09a1c197a194673136ea1b9c9a4cc663';
// Display the current and future weather grabbing from city input text box

