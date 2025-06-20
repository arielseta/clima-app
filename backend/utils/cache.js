const cache = new Map();

function set(key, data, ttl = 300000) { // padrão: 5 minutos
  const expires = Date.now() + ttl;
  cache.set(key, { data, expires });
}

function get(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

module.exports = { set, get };
