import axios from 'axios';
import { logoutUser } from '../utils/authHelper'; // criaremos abaixo

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Intercepta respostas com erro
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      logoutUser(); // dispara logout automático
    }
    return Promise.reject(error);
  }
);

export default api;
