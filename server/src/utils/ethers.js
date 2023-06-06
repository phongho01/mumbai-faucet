require('dotenv').config();
const { ethers } = require('ethers');
const { sendMessage } = require('./telegram');
const { diffTime } = require('./time');

const RPC_URL = process.env.MUMBAI_RPC_URL;

const isAddress = (address) => {
  return ethers.utils.isAddress(address);
};

const getBalance = async (account) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  return provider.getBalance(account);
};

const sendTransaction = async (to) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);

  console.log('===== START SENDING MATIC =====');
  return wallet.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(`${process.env.FAUCET_AMOUNT}`),
  });
};

const faucet = async (author, address, redis) => {
  let res = `<@${author}>, an error has been occurred. Please try again later.`;

  const remainingBalance = await getBalance(process.env.ACCOUNT_ADDRESS);
  if (remainingBalance.lte(ethers.utils.parseEther(`${process.env.FAUCET_AMOUNT}`))) {
    res = `<@${author}>, sorry, remaining balance is not enough to faucet.`;
    const text = `Remaining balance of account ${process.env.ACCOUNT_ADDRESS} is not enough to faucet. Please deposit to continue.`;
    sendMessage(text);
  } else if (!address || !isAddress(address)) {
    res = `<@${author}>, invalid address wallet.`;
  } else if ((await redis.get(author)) || (await redis.get(address))) {
    const diff = diffTime(Date.now(), +((await redis.get(author)) || (await redis.get(address))) + process.env.TIME_PER_FAUCET * 1000);
    res = `<@${author}>, you can only make one request per 24 hours. Please try again in ${diff}.`;
  } else {
    const redisOptions = {
      EX: process.env.TIME_PER_FAUCET,
      NX: true,
    };
    const tx = await sendTransaction(address);
    res = `<@${author}>, ${process.env.FAUCET_AMOUNT} MATIC are heading to your wallet, check https://mumbai.polygonscan.com/tx/${tx.hash} !`;
    redis.set(author, Date.now(), redisOptions);
    redis.set(address, Date.now(), redisOptions);
  }

  return res;
};

module.exports = {
  sendTransaction,
  getBalance,
  isAddress,
  faucet,
};
