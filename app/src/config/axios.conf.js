import axios from 'axios';

const env = import.meta.env.VITE_ENVIRONMENT;

const API_URL = {
  development: 'http://localhost:3001/api/v1',
  production: 'https://mumbai-faucet.onrender.com/api/v1',
};

const instance = axios.create({
  baseURL: API_URL[env],
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
