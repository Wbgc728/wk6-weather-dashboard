// Query Variables
const searchButton = document.querySelector(".city-submit");

// Define City Array and Index
var cityList = [];
var cityIndex = 0;





// var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=denver&appid=0949d437231f11230fcab1d16adade0c";

// var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&appid=' + openWeatherApiKey;


// Submit City Search Button
searchButton.addEventListener("click", function() {

    // Get City name input from Input Form
    var inputCity = document.getElementById("city-input");

    // Personal Weather API Key
    var openWeatherApiKey = "0949d437231f11230fcab1d16adade0c";
    console.log("addEventListener");

    // Weather API URL with city input and key
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity.value + "&appid=" + openWeatherApiKey;

    // List of cities last 5 cities, checking list length and removing the oldest
    cityIndex = cityList.length;
    if (cityIndex >= 5) {
        cityList.splice(0, 1);
        cityIndex = 0;
    }

    cityList[cityIndex++] = inputCity;
    console.log(inputCity);
    console.log(cityList);

    // store new city in History
    cityHistory();


    // Fetch weather Api
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCities();

            // Current City Name and Date
            var currentDate = data.dt;
            var currentDateCity = moment(currentDate).format("MMM Do YY");
            document.querySelector(".current-city").innerHTML = inputCity + "  " + currentDateCity;
        })
        .catch(err => alert("Invalid City Name"));

    // Create Temp Variable
    var temperature = data.main.temp;
    document.querySelector(".temp").innerHTML = "Temperature: " + Math.round(((temperature - 273.15) * 1.8) + 32) + " Degrees Fahrenheit";

    //Wind speed
    var windSpd = data.wind.speed;
    document.querySelector(".wind").innerHTML = "Wind: " + windSpd + " miles per hour";

    //Humidity index
    var humidityIndx = data.main.humidity;
    document.querySelector(".humidity").innerHTML = "Humidity: " + humidityIndx + " %";

})



// Store to local storarge
function cityHistory() {
    localStorage.setItem("cityList", JSON.stringify(cityList));

}

// 
function generateCities() {
    // Grab existing list of cities
    var cityHistory = JSON.parse(localStorage.getItem("cityList"));

    // If there is an existing list
    if (cityHistory != null) {
        cityList = cityHistory;
        console.log(cityList);
    }
    console.log("generate");
    displayCities();
}


function displayCities() {

    let cityEl = document.querySelector('#cityList');

    //displays 0 in cities array to the first button
    if (cityList[0]) {
        const btnP1 = document.querySelector(".buttonPrev1");
        var currentWeather = document.querySelector(".current-weather");
        var fiveDay = document.querySelector(".five-day");
        fiveDay.hidden = false;
        btnP1.hidden = false;
        currentWeather.hidden = false;
        btnP1.innerText = cityList[0];

    }

    //displays 1 in cities array to the first button
    if (cityList[1]) {
        const btnP2 = document.querySelector(".buttonPrev2");
        btnP2.hidden = false;
        btnP2.innerText = cityList[1];

    }

    //displays 2 in cities array to the first button
    if (cityList[2]) {
        const btnP3 = document.querySelector(".buttonPrev3");
        btnP3.hidden = false;
        btnP3.innerText = cityList[2];

    }

    //displays 3 in cities array to the first button
    if (cityList[3]) {
        const btnP4 = document.querySelector(".buttonPrev4");
        btnP4.hidden = false;
        btnP4.innerText = cityList[3];

    }

    //displays 4 in cities array to the first button
    if (cityList[4]) {
        const btnP5 = document.querySelector(".buttonPrev5");
        btnP5.hidden = false;
        btnP5.innerText = cityList[4];

    }


};

// Retrieve search array from local storage
generateCities()