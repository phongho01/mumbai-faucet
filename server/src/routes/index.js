const express = require('express');
const router = express.Router();
const faucetRoutes = require('./faucet.route');

const defaultRoutes = [
  {
    routes: faucetRoutes,
    path: '/faucets'
  }
]

defaultRoutes.forEach(item => router.use(item.path, item.routes));

module.exports = router