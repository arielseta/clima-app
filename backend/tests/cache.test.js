const { set, get } = require('../utils/cache');

describe('Cache em memória', () => {
  it('deve armazenar e retornar um valor', () => {
    set('teste', { valor: 123 }, 1000); // 1s
    const resultado = get('teste');
    expect(resultado).toEqual({ valor: 123 });
  });

  it('deve expirar após o tempo limite', async () => {
    set('expirar', { foo: 'bar' }, 100); // 100ms
    await new Promise(resolve => setTimeout(resolve, 150)); // espera mais que o TTL
    const resultado = get('expirar');
    expect(resultado).toBeNull();
  });
});
