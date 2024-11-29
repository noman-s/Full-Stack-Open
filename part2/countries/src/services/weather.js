import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;
const base_url = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`;

const getWeather = (city, country) => {
  const request = axios.get(`${base_url}&units=metric&q=${city},${country}`);
  return request.then((response) => response.data);
};

export default { getWeather };
