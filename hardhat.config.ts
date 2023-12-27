import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/ethereumjs-util";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    x1Testnet: {
      url: "https://testrpc.x1.tech",
      chainId: 195,
      accounts: [process.env.ACCOUNT_KEY as string], // (dev) X1 network wallet
      blockGasLimit: 10000000,
    },
  }
};

export default config;
