require('dotenv').config();

const connectDB = require('./config/db.conf');
const app = require('./app');
const { createClient } = require('redis');
const { start, login } = require('./utils/discord');

// using redis on local
// const client = createClient();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

const port = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log('App is listening on port ' + port);
      start().then(async () => {
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        await redisClient.connect();

        login(redisClient);
      });
    });
  })
  .catch((error) => {
    console.log('Starting', error);
  });
