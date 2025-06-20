import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

describe('Login', () => {
  it('deve renderizar o formulário e aceitar input', () => {
    render(
      <AuthContext.Provider value={{ login: vi.fn() }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const senhaInput = screen.getByPlaceholderText(/senha/i);
    const botao = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
    expect(botao).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(senhaInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('teste@teste.com');
    expect(senhaInput.value).toBe('123456');
  });
});
