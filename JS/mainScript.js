// Global Selection
let cityName = document.querySelector(".cityName");
let degreeUnit = document.querySelector(".degreeUnit");
let weatherIcon = document.querySelector(".weatherIcon");
let weatherCondition = document.querySelector(".weatherCondition");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".windUnit");
let wind_direction = document.querySelector(".wind_direction");
let secondDayIcon = document.querySelector(".secondDayIcon");
let secondDayWeatther = document.querySelector(".secondDayWeatther");
let seconDayWeatherF = document.querySelector(".seconDayWeatherF");
let secondDayStatus = document.querySelector(".secondDayStatus");
let thirdDayIcon = document.querySelector(".thirdDayIcon");
let thirdDayC = document.querySelector(".thirdDayC");
let thirdDayF = document.querySelector(".thirdDayF");
let thirdDayText = document.querySelector(".thirdDayText");
let citySearch = document.querySelector(".citySearch");
let searchCity = document.querySelector(".searchCity");
let Today = document.querySelector(".Today");
let Day1 = document.querySelector(".Day1");
let Day2 = document.querySelector(".Day2");
let Day3 = document.querySelector(".Day3");
let SimpleDate = document.querySelector(".SimpleDate");
let myCityName;
// Check if the browser supports the Geolocation API
if (navigator.geolocation) {
  // Get the current position
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.log("Geolocation is not supported by your browser");
}

// Success callback function
function successCallback(position) {
  // Access the latitude and longitude from the position object
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  console.log("Latitude: " + latitude);
  console.log("Longitude: " + longitude);
  getCityName(latitude,longitude)
  // You can use these coordinates as needed in your application

}

// Error callback function
function errorCallback(error) {
  // Handle errors such as user denying location access or other issues
  console.error("Error getting location: " + error.message);

}
//***************************************************************************************************



// Replace 'YOUR_API_KEY' with your actual API key from OpenCage

function getCityName(latitude, longitude) {
  const apiKey = "5b163c7280c9457691f6b529960819fd";
  // Construct the API request URL
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  // Make the API request
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Check if the response contains results
      if (data.results && data.results.length > 0) {
        // Extract the city name from the results
        let cityName = data.results[0].components.city;
        if(cityName==undefined)
        {
          cityName=data.results[0].components.state
        }
        console.log("City Name: " + JSON.stringify(data.results[0].components));
        myCityName=cityName;
      getWeather()
      } else {
        console.error("No results found for the given coordinates.");
      }
    })
    .catch(error => {
      console.error("Error fetching data from OpenCage API:", error);
    });
}

































// Gett Date
const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const Time = new Date();

// Get Date of Day1

let day1 = Days[Time.getDay()];
Day1.innerHTML = day1;

// Get Date of Day2
if (Time.getDay() == 6) {
  let day2 = Days[0];
  Day2.innerHTML = day2;
} else {
  let day2 = Days[Time.getDay() + 1];
  Day2.innerHTML = day2;
}

// Get Third Day
if (Time.getDay() == 5) {
  let day3 = Days[0];
  Day3.innerHTML = day3;
  console.log(day3 , "5")
} else if (Time.getDay() == 6) {
  let day3 = Days[1];
  Day3.innerHTML = day3;
    console.log(day3, "6");
} else {
  let day3 = Days[Time.getDay() + 2];
  Day3.innerHTML = day3;
    console.log(day3, "7");
}


// Get Current Months

SimpleDate.innerHTML = Time.getDate() + Months[Time.getMonth()];
 

async function getWeather() {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1b62e163b4024e0e81a193317240601&q=${myCityName==undefined?"cairo":myCityName}&days=3&aqi=no&alerts=no`
  );
  var FinalResponse = await response.json();
  // Get First Day
  cityName.innerHTML = FinalResponse.location.name;
  degreeUnit.innerHTML = `${FinalResponse.current.temp_c}<p class="d-inline"><sup class="supC">o</sup></sup>C</p>`;
  weatherIcon.setAttribute(
    "src",
    "https:" + FinalResponse.current.condition.icon
  );
  weatherCondition.innerHTML = FinalResponse.current.condition.text;
  humidity.innerHTML = `${FinalResponse.current.humidity} %`;
  wind.innerHTML = `${FinalResponse.current.wind_mph} mph`;
  wind_direction.innerHTML = FinalResponse.current.wind_dir;

  // Get Second Day
  secondDayIcon.setAttribute(
    "src",
    "https:" + FinalResponse.forecast.forecastday[1].day.condition.icon
  );
  secondDayWeatther.innerHTML = `${FinalResponse.forecast.forecastday[1].day.maxtemp_c}<p class="d-inline"><sup>o</sup></sup>C</p>`;
  seconDayWeatherF.innerHTML = `${FinalResponse.forecast.forecastday[1].day.maxtemp_f}<p class="d-inline"><sup>o</sup></sup>F</p>`;
  secondDayStatus.innerHTML =
    FinalResponse.forecast.forecastday[1].day.condition.text;
  // Get THird Day
  thirdDayIcon.setAttribute(
    "src",
    "https:" + FinalResponse.forecast.forecastday[1].day.condition.icon
  );
  thirdDayC.innerHTML = `${FinalResponse.forecast.forecastday[2].day.maxtemp_c}<p class="d-inline"><sup>o</sup></sup>C</p>`;
  thirdDayF.innerHTML = `${FinalResponse.forecast.forecastday[2].day.maxtemp_f}<p class="d-inline"><sup>o</sup></sup>F</p>`;
  thirdDayText.innerHTML =
    FinalResponse.forecast.forecastday[2].day.condition.text;
}
  getWeather();

// GeoLocation
citySearch.addEventListener("keyup", getCityWeather);
citySearch.addEventListener("blur", getCityWeather);
searchCity.addEventListener("click", getCityWeather);
async function getCityWeather() {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1b62e163b4024e0e81a193317240601&q=${citySearch.value}&days=3&aqi=no&alerts=no`
  );
  var FinalResponse = await response.json();
  // Get First Day
 
  cityName.innerHTML = FinalResponse.location.name;

  degreeUnit.innerHTML = `${FinalResponse.current.temp_c}<p class="d-inline"><sup class="supC">o</sup></sup>C</p>`;
  weatherIcon.setAttribute(
    "src",
    "https:" + FinalResponse.current.condition.icon
  );
  weatherCondition.innerHTML = FinalResponse.current.condition.text;
  humidity.innerHTML = `${FinalResponse.current.humidity} %`;
  wind.innerHTML = `${FinalResponse.current.wind_mph} mph`;
  wind_direction.innerHTML = FinalResponse.current.wind_dir;

  // Get Second Day
  secondDayIcon.setAttribute(
    "src",
    "https:" + FinalResponse.forecast.forecastday[1].day.condition.icon
  );
  secondDayWeatther.innerHTML = `${FinalResponse.forecast.forecastday[1].day.maxtemp_c}<p class="d-inline"><sup>o</sup></sup>C</p>`;
  seconDayWeatherF.innerHTML = `${FinalResponse.forecast.forecastday[1].day.maxtemp_f}<p class="d-inline"><sup>o</sup></sup>F</p>`;
  secondDayStatus.innerHTML =
    FinalResponse.forecast.forecastday[1].day.condition.text;
  // Get THird Day
  thirdDayIcon.setAttribute(
    "src",
    "https:" + FinalResponse.forecast.forecastday[1].day.condition.icon
  );
  thirdDayC.innerHTML = `${FinalResponse.forecast.forecastday[2].day.maxtemp_c}<p class="d-inline"><sup>o</sup></sup>C</p>`;
  thirdDayF.innerHTML = `${FinalResponse.forecast.forecastday[2].day.maxtemp_f}<p class="d-inline"><sup>o</sup></sup>F</p>`;
  thirdDayText.innerHTML =
    FinalResponse.forecast.forecastday[2].day.condition.text;
}
