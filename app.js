// Get longitude & latitude location
window.addEventListener('load', () => {
//    defining coordinates
    let long;
    let lat;
// create "if" statement
        if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
// console log to see if coordinates are received.
            // console.log(position)
            // access position
    long = position.coords.longitude;
    lat = position.coords.latitude;  

    const api = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=09a1c197a194673136ea1b9c9a4cc663&units=imperial" 
    });
    }


});