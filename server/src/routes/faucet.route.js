const express = require('express');
const router = express.Router();
const faucetController = require('../controllers/faucet.controller');

router.post('/', faucetController.faucet);
router.get('/:account', faucetController.account);

module.exports = router;