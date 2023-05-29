require('dotenv').config();
const mongoose = require('mongoose');

const DB_CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.neq96gg.mongodb.net/faucet`

const connectDB = () => {
  return mongoose.connect(DB_CONNECTION_URL);
}


module.exports = connectDB;