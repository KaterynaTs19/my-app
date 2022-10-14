function whatCurrentDate() {
  let nowDate = new Date();

  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; // JS says Sunday = 0

  let dayIndex = nowDate.getDay();
  let dayOfWeek = week[dayIndex];
  let hours = nowDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = nowDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dateToday = document.querySelector("#last-update");
  dateToday.innerHTML = `Last update: ${dayOfWeek}, ${hours}:${minutes}`;
}

whatCurrentDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mo", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
      <div class="col-2 forecast">
     
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
          
        <img
          src= "http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="Weather icon"
          class="weather-forecast-icon"
        />
        <div class="weather-forecast-temp">${Math.round(
          forecastDay.temp.day
        )}°C</div>
      </div>`;
    }
    console.log(forecastDay);
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "b9ba0314a93083136d968577c718e31d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showCurrentCityConditions(response) {
  document.querySelector("#value-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#value-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#precitation").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document
    .querySelector("#img-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#img-icon")
    .setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function showLocationByPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentCityConditions);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocationByPosition);
}

function showLocationByCity(cityName) {
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrlCity = `${apiEndpoint}?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlCity).then(showCurrentCityConditions);
}

function showCheckedCityTemp(event) {
  event.preventDefault();
  let input = document.querySelector("#your-city");
  showLocationByCity(input.value);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCheckedCityTemp);

showLocationByCity("Kharkiv");
