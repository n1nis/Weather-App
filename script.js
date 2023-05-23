const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=f75ecf17920807e04a3a158f772073cc";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value || "Iława";
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((res) => {
      const temp = res.data.main.temp;
      const hum = res.data.main.humidity;
      const status = Object.assign({}, ...res.data.weather);

      cityName.textContent = city;
      temperature.textContent = Math.floor(temp) + "℃";
      humidity.textContent = hum;
      weather.textContent = status.main;

      warning.textContent = "";
      input.value = "";

      if (status.id >= 200 && status.id < 300) {
        photo.setAttribute("src", "./thunderstorm.png");
      } else if (status.id >= 300 && status.id < 400) {
        photo.setAttribute("src", "./drizzle.png");
      } else if (status.id >= 500 && status.id < 600) {
        photo.setAttribute("src", "./rain.png");
      } else if (status.id >= 600 && status.id < 700) {
        photo.setAttribute("src", "./ice.png");
      } else if (status.id >= 700 && status.id < 800) {
        photo.setAttribute("src", "./fog.png");
      } else if (status.id === 800) {
        photo.setAttribute("src", "./sun.png");
      } else if (status.id > 800 && status.id < 900) {
        photo.setAttribute("src", "./cloud.png");
      } else {
        photo.setAttribute("src", "./unknown.png");
      }
    })
    .catch(() => {
      warning.textContent = "Wpisz poprawną nazwe miasta!";
    });
};

const enterCheck = (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
};

input.addEventListener("keyup", enterCheck);
button.addEventListener("click", getWeather);
getWeather();
