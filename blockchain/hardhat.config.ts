import * as dotenv from 'dotenv';
dotenv.config();
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      accounts: { count: 20 },
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
    mainnet: {
      url: 'https://bsc-dataseed1.ninicoin.io',
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
  },
  etherscan: {
    apiKey: {
      goerli: `${process.env.ETHERSCAN_API_KEY}`,
      bscTestnet: `${process.env.BINANCE_API_KEY}`,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
        },
      },
      {
        version: '0.7.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
        },
      },
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};

export default config;