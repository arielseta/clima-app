const { getWeatherByCity } = require('../services/weatherService');
const axios = require('axios');
const cache = require('../utils/cache');

exports.getWeather = async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ message: 'Parâmetro \"city\" é obrigatório' });

  const cacheKey = `weather_city_${city.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const data = await getWeatherByCity(city);
    cache.set(cacheKey, data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados do clima', error: err.message });
  }
};


exports.getWeatherByCoords = async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ message: 'lat e lon são obrigatórios' });

  const cacheKey = `weather_coords_${lat}_${lon}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`;
    const response = await axios.get(url);
    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar por coordenadas', error: err.message });
  }
};

