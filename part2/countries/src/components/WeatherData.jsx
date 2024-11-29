import { useEffect, useState } from "react";
import WeatherService from "../services/weather";

const WeatherData = ({ city, country }) => {
  const [weatherData, setWeatherData] = useState(null);

  const weatherConditionIconURL = (icon) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  useEffect(() => {
    WeatherService.getWeather(city, country).then((data) =>
      setWeatherData(data),
    );
  }, []);

  if (!weatherData) return null;

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>Temperature: {weatherData.main.temp}º Celsius</div>
      <div>
        <img src={weatherConditionIconURL(weatherData.weather[0].icon)}></img>
      </div>
      <div>Wind {weatherData.wind.speed} m/s</div>
    </div>
  );
};

export default WeatherData;
