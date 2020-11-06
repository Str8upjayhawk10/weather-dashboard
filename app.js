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
function searchCities(c) {
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
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city = searchCity.val().trim();
        currentWeather(city);
    }
}
// Create fetch to call
function currentWeather(searchCity){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ searchCity +"&appid=" + APIKey)
    .then(function(response){
        return response.json()
    }).then(function(data){
        // console.log data to display weather coord:{...} within console.log window
        console.log(data)
        let weatherIcon = data.weather[0].icon;
        // got weather icon png from openweathermap.org
        let iconUrl ='https://openweathermap.org/img/wn/'+weatherIcon +'@2x.png';
        // getDate()method found on mozilla/stackover flow
        let date = newDate(data.dt*1000).toLocalDateString();
    });
}
// Created a function to load 
function loadlastCity(){
    $("ul").empty();
    var cityEl = JSON.parse(localStorage.getItem("cityname"));
    if(cityEl!==null){
        cityEl=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<cityEl.length;i++){
            addToList(cityEl[i]);
        }
        city=cityEl[i-1];
        currentWeather(city);
    }

}
// add on click listner
$("#search-button").on("click",displayWeather);
// process load event when give resources has loaded
$(window).on("load",loadlastCity);