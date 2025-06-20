const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

exports.getWeatherByCity = async (city) => {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`;
  const response = await axios.get(url);
  return response.data;
};
