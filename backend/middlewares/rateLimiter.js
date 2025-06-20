const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10,                 // até 10 requisições por minuto
  message: 'Limite de requisições excedido. Tente novamente em instantes.'
});

module.exports = limiter;
