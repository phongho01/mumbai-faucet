require('dotenv').config();
const Faucet = require('../models/Faucet.schema');
const { NETWORK } = require('../constants');
const { sendTransaction, getBalance } = require('../utils/ethers');
const { sendMessage } = require('../utils/telegram');
const { ethers } = require('ethers');

class OrderController {
  async faucet(req, res) {
    try {
      const { account } = req.body;
      const remainingBalance = await getBalance(process.env.ACCOUNT_ADDRESS);
      if (remainingBalance.lte(ethers.utils.parseEther(`${process.env.FAUCET_AMOUNT}`))) {
        const text = `Remaining balance of account ${process.env.ACCOUNT_ADDRESS} is not enough to faucet. Please deposit to continue.`
        sendMessage(text);
        res.statusMessage = 'Remaining balance is not enough';
        return res.status(400).send();
      }
      
      const tx = await sendTransaction(account);
      const newFaucet = await Faucet.create({
        network: NETWORK.MUMBAI,
        account,
        txHash: tx.hash,
        amount: process.env.FAUCET_AMOUNT,
      });

      res.json(newFaucet);
    } catch (error) {
      console.log('error', error);
      res.sendStatus(500);
    }
  }

  async account(req, res) {
    try {
      const account = req.params.account;
      const dateNow = Date.now();
      const ONE_DAY = 24 * 60 * 60 * 1000;
      const conditions = {
        account: { $regex: account, $options: 'i' },
        createdAt: { $gte: new Date(dateNow - ONE_DAY) },
      };
      const faucets = await Faucet.find(conditions).sort({ createdAt: -1 });
      res.json(faucets);
    } catch (error) {
      console.log('error', error);
      res.sendStatus(500);
    }
  }
}

module.exports = new OrderController();
