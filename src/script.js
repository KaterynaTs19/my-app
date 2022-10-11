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

function toFahrenheit() {
  let celsius = 28;
  let fahrenheit = Math.round(celsius * (9 / 5) + 32);
  let valueMax = document.querySelector(".value-max");
  valueMax.innerHTML = `${fahrenheit}`;
}
function toCelsius() {
  let valueMax = document.querySelector(".value-max");
  valueMax.innerHTML = "28";
}

whatCurrentDate();

let fahrenheitValue = document.querySelector(".fahrenheit");
fahrenheitValue.addEventListener("click", toFahrenheit);

let celsiusValue = document.querySelector(".celsius");
celsiusValue.addEventListener("click", toCelsius);

function showCurrentCityConditions(response) {
  console.log(response);
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

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);

function showLocationByCity(cityName) {
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrlCity = `${apiEndpoint}?q=${cityName}&appid=${apiKey}&units=${units}`;
  console.log(apiUrlCity);
  axios.get(apiUrlCity).then(showCurrentCityConditions);
}

function showCheckedCityTemp(event) {
  event.preventDefault();

  let input = document.querySelector("#your-city");
  showLocationByCity(input.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCheckedCityTemp);

showLocationByCity("Kharkiv");
