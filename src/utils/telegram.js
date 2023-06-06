require('dotenv').config();
const axios = require('axios');

const BASE_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}`;

const sendMessage = async (text) => {
  const URL = `${BASE_URL}/sendMessage`;
  await axios.get(URL, { params: { chat_id: process.env.TELEGRAM_CHAT_ID, text } });
};

module.exports = { sendMessage };