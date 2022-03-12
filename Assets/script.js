// Query Variables
var searchButton = document.querySelector(".city-submit");
var searchCityInput = document.querySelector(".city-input")
var previousCities = document.querySelector(".previous-searches")

// Define City Array and Index
var cityList = [];
var cityIndex = 0;


// var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=denver&appid=0949d437231f11230fcab1d16adade0c";
// var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&appid=' + openWeatherApiKey;



function displayCities() {


    //Un
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

// Retrieve city list from local storage
function generateCities() {
    // Grab existing list of cities
    var cityHistory = JSON.parse(localStorage.getItem("cityList"));

    // If there is an existing list
    if (cityHistory != null) {
        cityList = cityHistory;
        console.log(cityList);
    }
    displayCities();
};

// Store to local storarge with new entry
function cityHistory() {
    localStorage.setItem("cityList", JSON.stringify(cityList));
};


// Submit City Search Button
searchButton.addEventListener("click", function cityRequest() {

    // Grab value entered into search bar 
    var inputCity = document.querySelector(".city-input").value

    // Personal Weather API Key
    var openWeatherApiKey = "0949d437231f11230fcab1d16adade0c";

    // Weather API URL with city input and key
    var apiUrl = (`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${openWeatherApiKey}`)

    // List of cities last 5 cities, checking list length and removing the oldest
    cityIndex = cityList.length;
    if (cityIndex >= 5) {
        cityList.splice(0, 1);
        cityIndex = 0;
    }

    cityList[cityIndex++] = inputCity;

    // store new city in History
    cityHistory();



    // Fetch Openweather API for current weather and for Lat and Longitude, convert city to lat & long for forcast
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCities();

            // Display API Data - Current Weather
            // Current City Name and Date
            var currentDate = data.dt * 1000;
            var currentDateCity = moment(currentDate).format("L");
            document.querySelector(".current-city").innerHTML = inputCity + "  " + currentDateCity;
            console.log(currentDate);
            console.log(currentDateCity);

            // Create Temp Variable
            var temperature = data.main.temp;
            document.querySelector(".current-temp").innerHTML = "Temperature: " + Math.round(((temperature - 273.15) * 1.8) + 32) + " Degrees Fahrenheit";
            console.log(temperature);

            //Wind speed
            var windSpeed = data.wind.speed;
            document.querySelector(".current-wind").innerHTML = "Wind: " + windSpeed + " miles per hour";
            console.log(windSpeed);

            //Humidity index
            var humidityIndex = data.main.humidity;
            document.querySelector(".current-humidity").innerHTML = "Humidity: " + humidityIndex + " %";
            console.log(humidityIndex);


            //Create variables for lat and long
            var Lat = data.coord.lat;
            var Long = data.coord.lon;
            console.log(Lat);
            console.log(Long);


            //oneCall OpenWeather API to display the data using lat and long
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${Lat}&lon=${Long}&exclude=current,minutely,hourly,alerts&appid=${openWeatherApiKey}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    // Display API Data - Forcast
                    // Today Forcast Card
                    var todayDate = data.daily[1].dt * 1000;
                    document.querySelector(".today-date").innerHTML = moment(todayDate).format("L");

                    var todayTemp = data.daily[1].temp.day;
                    document.querySelector(".today-temp").innerHTML = "Temp: " + Math.round(((todayTemp - 273.15) * 1.8) + 32) + " F";

                    var todayWind = data.daily[1].wind_speed;
                    document.querySelector(".today-wind").innerHTML = "Wind: " + todayWind + "MPH";

                    var todayHumid = data.daily[1].humidity;
                    document.querySelector(".today-humidity").innerHTML = "Humidity: " + todayHumid + " %";


                    // +1 day Forcast Card
                    var plus1Date = data.daily[2].dt * 1000;
                    document.querySelector(".one-date").innerHTML = moment(plus1Date).format("L");

                    var plus1Temp = data.daily[2].temp.day;
                    document.querySelector(".one-temp").innerHTML = "Temp: " + Math.round(((plus1Temp - 273.15) * 1.8) + 32) + " F";

                    var plus1Wind = data.daily[2].wind_speed;
                    document.querySelector(".one-wind").innerHTML = "Wind: " + plus1Wind + "MPH";

                    var plus1Humid = data.daily[2].humidity;
                    document.querySelector(".one-humidity").innerHTML = "Humidity: " + plus1Humid + " %";


                    // +2 Day Forcast Card
                    var plus2Date = data.daily[3].dt * 1000;
                    document.querySelector(".two-date").innerHTML = moment(plus2Date).format("L");

                    var plus2Temp = data.daily[3].temp.day;
                    document.querySelector(".two-temp").innerHTML = "Temp: " + Math.round(((plus2Temp - 273.15) * 1.8) + 32) + " F";

                    var plus2Wind = data.daily[3].wind_speed;
                    document.querySelector(".two-wind").innerHTML = "Wind: " + plus2Wind + "MPH";

                    var plus2Humid = data.daily[3].humidity;
                    document.querySelector(".two-humidity").innerHTML = "Humidity: " + plus2Humid + " %";


                    // +3 Day Forcast Card
                    var plus3Date = data.daily[4].dt * 1000;
                    document.querySelector(".three-date").innerHTML = moment(plus3Date).format("L");

                    var plus3Temp = data.daily[4].temp.day;
                    document.querySelector(".three-temp").innerHTML = "Temp: " + Math.round(((plus3Temp - 273.15) * 1.8) + 32) + " F";

                    var plus3Wind = data.daily[4].wind_speed;
                    document.querySelector(".three-wind").innerHTML = "Wind: " + plus3Wind + "MPH";

                    var plus3Humid = data.daily[4].humidity;
                    document.querySelector(".three-humidity").innerHTML = "Humidity: " + plus3Humid + " %";


                    // +4 Day Forcast Card
                    var plus4Date = data.daily[5].dt * 1000;
                    document.querySelector(".four-date").innerHTML = moment(plus4Date).format("L");

                    var plus4Temp = data.daily[5].temp.day;
                    document.querySelector(".four-temp").innerHTML = "Temp: " + Math.round(((plus4Temp - 273.15) * 1.8) + 32) + " F";

                    var plus4Wind = data.daily[5].wind_speed;
                    document.querySelector(".four-wind").innerHTML = "Wind: " + plus4Wind + "MPH";

                    var plus4Humid = data.daily[5].humidity;
                    document.querySelector(".four-humidity").innerHTML = "Humidity: " + plus4Humid + " %";

                })

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
        displayCities();
    }



});


previousCities.addEventListener("click", function(event) {
    var prevCityButton = $(this).text();
    console.log(prevCityButton)
    cityRequest(prevCityButton)
})

// Retrieve search array from local storage
generateCities()