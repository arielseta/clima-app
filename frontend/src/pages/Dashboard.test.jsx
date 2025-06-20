import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mocks
vi.mock('../services/weatherService', () => ({
  getWeather: vi.fn(() => Promise.resolve({
    name: 'São Paulo',
    main: { temp: 28 },
    weather: [{ description: 'céu limpo' }]
  }))
}));

vi.mock('../services/historyService', () => ({
  getHistory: vi.fn(() => Promise.resolve([
    {
      city: 'Rio de Janeiro',
      weatherData: {
        main: { temp: 30 },
        weather: [{ description: 'ensolarado' }]
      },
      createdAt: new Date().toISOString()
    }
  ])),
  saveSearch: vi.fn(() => Promise.resolve())
}));

describe('Dashboard', () => {
  it('deve renderizar e buscar clima com histórico', async () => {
    render(
      <AuthContext.Provider value={{ token: 'fake-token', logout: vi.fn() }}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const input = screen.getByPlaceholderText(/cidade/i);
    const botao = screen.getByRole('button', { name: /buscar clima/i });

    expect(input).toBeInTheDocument();
    expect(botao).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'São Paulo' } });
    fireEvent.click(botao);

    await waitFor(() => {
      expect(screen.getByText(/são paulo/i)).toBeInTheDocument();
      expect(screen.getByText(/28°C/)).toBeInTheDocument();
    });

    expect(screen.getByText(/rio de janeiro/i)).toBeInTheDocument();
    expect(screen.getByText(/30°C/)).toBeInTheDocument();
  });
});
