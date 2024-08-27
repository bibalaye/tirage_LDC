const redis = require('redis');

let client;

async function connectRedis() {
  client = redis.createClient({
    url: process.env.REDIS_URL
  });

  client.on('error', (err) => console.log('Erreur Redis :', err));

  await client.connect();
}

async function getCache(key) {
  if (!client || !client.isOpen) {
    await connectRedis();
  }
  return client.get(key);
}

async function setCache(key, value) {
  if (!client || !client.isOpen) {
    await connectRedis();
  }
  await client.set(key, value, { EX: 3600 }); // Expire après 1 heure
}

module.exports = { getCache, setCache, connectRedis };