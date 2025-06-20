import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getWeather, getWeatherByCoords } from '../services/weatherService';
import { getHistory, saveSearch } from '../services/historyService';
import { formatDate } from '../utils/formatDate';

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscar = async () => {
    if (!city) return alert('Digite uma cidade!');
    setLoading(true);
    try {
      const data = await getWeather(city, token);
      setResult(data);
      await saveSearch(city, data, token);
      setCity('');
      loadHistory();
    } catch (err) {
      alert('Erro ao buscar clima');
    } finally {
      setLoading(false);
    }
  };

  const buscarPorCidade = async (cidade) => {
    setLoading(true);
    try {
      const data = await getWeather(cidade, token);
      setResult(data);
      await saveSearch(cidade, data, token);
      setCity('');
      loadHistory();
    } catch (err) {
      alert('Erro ao buscar clima');
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      const data = await getHistory(token);
      setHistory(data);
    } catch (err) {
      console.error('Erro ao carregar histórico');
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const data = await getWeatherByCoords(latitude, longitude, token);
        setResult(data);
      } catch (err) {
        console.error('Erro ao buscar clima geolocalizado');
      }
    });
    loadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">🌤️ Dashboard</h2>
          <button
            onClick={logout}
            className="text-sm px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Sair
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            buscar();
          }}
          className="flex gap-4 mb-6"
        >
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Digite uma cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {result && (
          <div className="bg-blue-50 p-4 rounded-md shadow mb-6">
            <h3 className="text-lg font-semibold text-blue-800">{result.name}</h3>
            <div className="flex items-center gap-4">
              <img
                src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
                alt="Ícone do tempo"
                className="w-12 h-12"
              />
              <div>
                <p className="text-gray-700">
                  🌡️ <strong>{result.main.temp}°C</strong>
                </p>
                <p className="text-gray-600 capitalize">
                  ☁️ {result.weather[0].description}
                </p>
              </div>
            </div>
          </div>
        )}

        <h4 className="text-xl font-semibold mb-2 text-gray-700">Histórico de buscas</h4>
        <ul className="space-y-3">
          {history.map((h, i) => (
            <li
              key={i}
              className="bg-gray-50 border p-3 rounded-md hover:bg-blue-50 cursor-pointer"
              onClick={() => buscarPorCidade(h.city)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-800">{h.city}</p>
                  <p className="text-sm text-gray-600">
                    {h.weatherData.main.temp}°C — {h.weatherData.weather[0].description}
                  </p>
                </div>
                <p className="text-xs text-gray-500">{formatDate(h.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
