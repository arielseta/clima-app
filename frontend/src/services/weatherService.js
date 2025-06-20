import api from '../api';

export const getWeather = async (city, token) => {
  const res = await api.get(`/weather?city=${city}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getWeatherByCoords = async (lat, lon, token) => {
  const res = await api.get(`/weather/coords?lat=${lat}&lon=${lon}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
