// Declared a varible to cache city search html line:24
let city = '';
let date = 'newDate';
// Create a varible declaration
let searchCity = $('#search-city');
let searchButton = $('#search-button');
let clearButton = $('#clear-history');
let currentCity = $('#current-city');
let currentTemperature = $('#temperature');
let currentHumidity = $('#humidity');
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
        let iconUrl =('https://openweathermap.org/img/wn/'+ weatherIcon +'@2x.png');
        // getDate()method found on mozilla/stackover flow
        let date = (new Date(data.dt*1000)).toLocaleDateString();

        // parse response for name of city concatenate city date and icon
        $('#current-city').html(data.name +'('+date+')' + '<img src='+iconUrl+'>');
        // display current temp convert temp to fahrenheit
        let tempF = (data.main.temp - 273.15) * 1.80 + 32;
        $('#temperature').html((tempF).toFixed(2)+'&#8457');
        // display humidity
        $('#humidity').html(data.main.humidity+'%');
        //Display Wind speed and convert to MPH
        let ws=data.wind.speed;
        let windsmph=(ws*2.237).toFixed(1);
        $('#wind-speed').html(windsmph+'MPH');
        // display windspeed and convert miles per hour
        getUvIndex(data.coord.lat,data.coord.lon); 
        forecast(data.id);
        if(data.cod==200){
            cityEl=JSON.parse(localStorage.getItem('cityname'));
            console.log(cityEl);
            if (cityEl==null){
                cityEl=[];
                cityEl.push(city.toUpperCase()
                );
                localStorage.setItem('cityname',JSON.stringify(cityEl));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    cityEl.push(city.toUpperCase());
                    localStorage.setItem('cityname',JSON.stringify(cityEl));
                    addToList(city);
                }
            }
        }
    });
}
// Create function to return uvIndex data
function getUvIndex(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/uvi?appid='+ APIKey + '&lat=' +lat+'&lon='+lon)
    // $('#uv-index')
    .then(function(response){
        return response.json()
    }).then(function(data){
        $('#uv-index').html(data.value);
})
}
// Created a function to load 
function loadlastCity(){
    $('ul').empty();
    var cityEl = JSON.parse(localStorage.getItem('cityname'));
    if(cityEl!==null){
        cityEl=JSON.parse(localStorage.getItem('cityname'));
        for(i=0; i<cityEl.length;i++){
            addToList(cityEl[i]);
        }
        city=cityEl[i-1];
        currentWeather(city);
    }

}
//Clear the search history from the page
function clearHistory(event){
    event.preventDefault();
    cityEl=[];
    localStorage.removeItem('cityname');
    document.location.reload();

}
function invokePastSearch(event){
    var liEl=event.target;
    if (event.target.matches('li')){
        city=liEl.textContent.trim();
        currentWeather(city);
    }

}
function forecast(cityId){
    let dayOver = false;
    fetch('https://api.openweathermap.org/data/2.5/forecast?id='+ cityId + '&appid='+APIKey)
    .then(function(response){ 
        return response.json()
    }).then(function(data){
        for (i=0;i<5;i++){
            let date = new Date((data.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            let iconcode = data.list[((i+1)*8)-1].weather[0].icon;
            let iconUrl=('https://openweathermap.org/img/wn/'+iconcode+'.png');
            let tempK= data.list[((i+1)*8)-1].main.temp;
            let tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
            let humidity= data.list[((i+1)*8)-1].main.humidity;
        
            $('#iDate'+i).html(date);
            $('#iImg'+i).html('<img src='+iconUrl+'>');
            $('#iTemp'+i).html(tempF+'&#8457');
            $('#iHumidity'+i).html(humidity+'%');
        }
})
}
function addToList(c){
    var listEl= $('<li>'+c.toUpperCase()+'</li>');
    $(listEl).attr('class','list-group-item');
    $(listEl).attr('data-value',c.toUpperCase());
    $('.history-cache').append(listEl);
}

// add on click listner
$('#search-button').on('click',displayWeather);
// process load event when give resources has loaded
$(window).on('load',loadlastCity);
$(document).on('click',invokePastSearch);
$('#clear-history').on('click',clearHistory);