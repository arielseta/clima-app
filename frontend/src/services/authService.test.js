import { login, register } from './authService';
import api from '../api';

vi.mock('../api');

describe('authService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve chamar POST /auth/login e retornar token', async () => {
    const mockResponse = { token: 'abc123', user: { email: 'teste@clima.com' } };
    api.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await login('teste@clima.com', '123456');
    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'teste@clima.com',
      password: '123456'
    });
    expect(result).toEqual(mockResponse);
  });

  it('deve chamar POST /auth/register e retornar dados', async () => {
    const mockResponse = { token: 'xyz789', user: { email: 'novo@clima.com' } };
    api.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await register('novo@clima.com', 'senha');
    expect(api.post).toHaveBeenCalledWith('/auth/register', {
      email: 'novo@clima.com',
      password: 'senha'
    });
    expect(result).toEqual(mockResponse);
  });
});
