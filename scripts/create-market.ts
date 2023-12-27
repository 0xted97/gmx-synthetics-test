import { ethers } from "hardhat";
import { getContractMarketFactory, getContractReader } from "./constants/contracts";
import { DefaultMarket, getMarketTokenAddress } from "./constants/markets";
import { addresses } from "./constants/addresses";

async function main() {
  // Create market pool
  // MarketFactory.createMarket()
  const { indexToken, longToken, shortToken, type } = DefaultMarket;
  const marketFactory = await getContractMarketFactory();
  const reader = await getContractReader();
  const createMarketTx = await marketFactory.createMarket(indexToken, longToken, shortToken, type);
  await createMarketTx.wait();

  // const marketTokenAddress = getMarketTokenAddress(indexToken, longToken, shortToken, type, addresses.MarketFactory, addresses.RoleStore, addresses.DataStore);
  // console.log("🚀 ~ file: create-market.ts:17 ~ main ~ marketTokenAddress:", marketTokenAddress)

  
  const market = await reader.getMarket(addresses.DataStore, "0x2591EE1fEFb78C85b71B33210b3AcF15250A10A2");
  console.log("🚀 ~ file: create-market.ts:16 ~ main ~ market:", market)
  // const markets = await reader.getMarkets(addresses.DataStore, 0,10000000);
  // console.log("🚀 ~ file: create-market.ts:20 ~ main ~ markets:", markets)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
