  function dateTime(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];
  let formattedDate = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;
  return formattedDate;
}
function showWeatherTemp(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
}
function searchCity(city) {
  let apiKey = "e69d8404a2535885a8e02325aef69c55";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherTemp);
}
function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "e69d8404a2535885a8e02325aef69c55";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}
&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherTemp);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let date = document.querySelector(`#date`);
date.innerHTML = dateTime(new Date());
let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener(`submit`, submit);
let currentButton = document.querySelector(`#current-location-button`);
currentButton.addEventListener(`click`, getCurrentLocation);