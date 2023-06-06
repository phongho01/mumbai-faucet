const { createClient } = require('redis');
const { start, login } = require('./utils/discord');

const client = createClient();

start().then(async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();

  login(client);
});
