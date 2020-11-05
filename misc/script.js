
function getWeather(){
    var searchCity = $("#search-city").val()

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+searchCity+"&appid=09a1c197a194673136ea1b9c9a4cc663&units=imperial")
    .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
        //attach data to id's of html
        
        //call UVIndex
        //call 5day forcast
        //possibly save it as a button below the search bar with localstorage (worry about last)
    })
}

//5day forcast function
//for(var i = 0; i < 40; i=i+8){} //* can replace 40 with length of list from 5day

//UVindex Function

//Localstorage stuff



$("#search-button").click(getWeather)