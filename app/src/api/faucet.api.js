import axios from '../config/axios.conf';

export const faucet = (data) => {
  return axios.post('/faucets', data);
};

export const getFaucet = (account) => {
  return axios.get('/faucets/' + account);
}