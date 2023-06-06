const COMMANDS = [
  {
    name: 'faucet',
    description: 'Request Mumbai Polygon (MATIC)!',
    options: [
      {
        name: 'address',
        type: 3,
        require: true,
        description: 'Address of account will be received MATIC',
      },
    ],
  },
];

module.exports = {
    COMMANDS
}