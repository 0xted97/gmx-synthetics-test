import { ethers, network } from "hardhat";
import { getContractChain, getContractDataStore, getContractDepositHandler, getContractDepositVault, getContractExchangeRouter, getContractPriceFeedTokenErc20, getContractReader, getContractRouter, getContractTokenErc20, getWOKB9 } from "../constants/contracts";
import { addresses } from "../constants/addresses";
import * as keys from "../utils/keys";
import { Oracle } from "../../typechain-types/contracts/oracle";
import { MyTokenUSDCMarketToken } from "../constants/markets";
import { tokens } from "../constants/tokens";

/**
 * Deposit WNT + Stablecoin
 */
async function main() {
  const networkName = network.name;
  const [wallet, , keeper] = await ethers.getSigners();
  const marketMtUsdc = MyTokenUSDCMarketToken;

  const exchangeRouter = await getContractExchangeRouter(networkName);
  const exchangeAddress = await exchangeRouter.getAddress();

  const reader = await getContractReader(networkName);
  const dataStore = await getContractDataStore(networkName);
  const depositVault = await getContractDepositVault(networkName);
  const depositHandler = await getContractDepositHandler(networkName);
  const priceFeed = await getContractPriceFeedTokenErc20(tokens[networkName].MyToken.priceFeed || "");

  const market = await reader.getMarket(addresses[networkName].DataStore, marketMtUsdc.marketToken);
  console.log("🚀 ~ file: deposit-liquidity.ts:23 ~ main ~ market:", market)


  const longToken = await getContractTokenErc20(market[2]); // MyToken
  const shortToken = await getContractTokenErc20(market[3]); // MyUSDC
  const wnt = await getWOKB9(networkName); // wrap okb


  // Get deposit of account
  const depositKeys = await dataStore.getBytes32ValuesAt(keys.accountDepositListKey(wallet.address), 0, 10000);


  const latestRoundData = await priceFeed.latestRoundData();
  const executeDeposit = (key: string) => {
    const params = {
      key,
      oracleBlockNumber:"",
      tokens: [longToken.target],
      precisions: [6],
      minPrices: [ethers.parseUnits("1000", 18)],
      maxPrices: [ethers.parseUnits("2500", 18)],
      execute: depositHandler.executeDeposit,
      gasUsageLabel: "executeDeposit",
      realtimeFeedTokens:[priceFeed.target.toString()],
      realtimeFeedData: [],
      priceFeedTokens: [priceFeed.target.toString()],
    }
  }

  for await (const key of depositKeys) {

    const depositInfo = await reader.getDeposit(dataStore.target, key);
    
    executeDeposit(key);

  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
