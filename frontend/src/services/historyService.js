import api from '../api';

export const getHistory = async (token) => {
  const res = await api.get('/history', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const saveSearch = async (city, weatherData, token) => {
  const res = await api.post(
    '/history',
    { city, weatherData },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
