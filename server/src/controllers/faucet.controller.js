const Faucet = require('../models/Faucet.schema');
const { NETWORK } = require('../constants');
const { sendTransaction } = require('../utils/ethers');

class OrderController {
  async faucet(req, res) {
    try {
      const { network, account } = req.body;
      if (!network || !account) {
        res.statusMessage = 'Invalid input';
        return res.status(400).send();
      }

      if (!Object.values(NETWORK).includes(network)) {
        res.statusMessage = 'Invalid network';
        return res.status(400).send();
      }

      console.log('===== SEND MATIC =====');
      const receipt = await sendTransaction(network, account);
      const newFaucet = await Faucet.create({
        network,
        account,
        txHash: receipt.transactionHash,
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