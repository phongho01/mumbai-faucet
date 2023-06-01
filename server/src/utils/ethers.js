require('dotenv').config();
const { NETWORK } = require('../constants');
const { ethers } = require('ethers');

const RPC_URL = {
  [NETWORK.MUMBAI]: process.env.MUMBAI_RPC_URL,
};

const getBalance = async (network, account) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL[network]);
  return provider.getBalance(process.env.ACCOUNT_ADDRESS);
};

const sendTransaction = async (network, to) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL[network]);
  const wallet = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);  

  return wallet.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(`${process.env.FAUCET_AMOUNT}`),
  });
};

module.exports = {
  sendTransaction,
  getBalance
};
