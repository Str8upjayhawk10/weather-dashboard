// Get longitude & latitude location
window.addEventListener('load', () => {
//    defining coordinates
    let long;
    let lat;
// create "if" statement
        if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
// console log to see if coordinates are received.
            console.log(position)
            // access position
    long = position.coords.longitude;
    lat = position.coords.latitude;  
// issues with api (want to use longitude & latitude)/created api (const) pull weather request 
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=35.9862733&lon=-115.12369519999999&appid=09a1c197a194673136ea1b9c9a4cc663&units=imperial`;
// fetch request
            fetch(api)
            .then(data => {
                return data.json();
            })
            .then(response => {
                console.log(response);
            });
    });
    }


});