import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/ethereumjs-util";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10,
        details: {
          constantOptimizer: true,
        },
      },
    },
  },
  networks: {
    x1Testnet: {
      url: "https://testrpc.x1.tech",
      chainId: 195,
      accounts: process.env.ACCOUNT_KEYS?.split(',') || [], // should use seed phrase, (dev) X1 network wallet
      blockGasLimit: 10000000,
    },
    arbitrum: {
      url: "https://arbitrum.meowrpc.com",
      chainId: 42161,
      accounts: process.env.ACCOUNT_KEYS?.split(',') || [], // (dev) X1 network wallet
      blockGasLimit: 10000000,
    },
  }
};

export default config;
