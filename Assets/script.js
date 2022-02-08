// Query Variables
var inputCity = document.querySelector('.city-search');
var submitButton = document.querySelector('.search');
var city = document.querySelector('.city');
var description = document.querySelector('.description');
var temperature = document.querySelector('temperature');

var openWeatherApiKey = '0949d437231f11230fcab1d16adade0c';

// var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=denver&appid=0949d437231f11230fcab1d16adade0c";

var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputCity.value + '&appid=' + openWeatherApiKey;

submitButton.addEventListener('click', function() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var cityValue = data['city'];
            var tempValue = data['main']['temp'];
            var descValue = data['weather'][0]['description'];

            city.innerHTML = nameValue;
            temp.innerHTML = nameValue;
            desc.innerHTML = nameValue;


        })

    .catch(err => alert("wrong city name"))

})

// const li = document.createElement("li");
//       li.classList.add("city");