import { ethers, network } from "hardhat";
import { getContractMarketFactory, getContractReader } from "./constants/contracts";
import { DEFAULT_MARKET_TYPE, getMarketTokenAddress } from "./constants/markets";
import { addresses } from "./constants/addresses";
import { tokens } from "./constants/tokens";

async function main() {
  const networkName = network.name;

  // Create market pool
  // MarketFactory.createMarket()
  const MyToken = tokens[networkName].MyToken;
  const USDC = tokens[networkName].USDC;

  const indexToken = MyToken.address;
  const longToken = MyToken.address;
  const shortToken = USDC.address;

  const marketFactory = await getContractMarketFactory(networkName);
  const roleStoreAddress = await marketFactory.roleStore();
  const dataStoreAddress = await marketFactory.dataStore();
  const eventEmitterAddress = await marketFactory.eventEmitter();
  const reader = await getContractReader(networkName);

  const createMarketTx = await marketFactory.createMarket(MyToken.address, MyToken.address, USDC.address, DEFAULT_MARKET_TYPE);
  await createMarketTx.wait();

  const marketTokenAddress = getMarketTokenAddress(indexToken, longToken, shortToken, DEFAULT_MARKET_TYPE, marketFactory.target.toString(), roleStoreAddress, dataStoreAddress);
  console.log("🚀 ~ file: create-market.ts:17 ~ main ~ marketTokenAddress:", marketTokenAddress)


  // const market = await reader.getMarket(addresses[networkName].DataStore, "0x2591EE1fEFb78C85b71B33210b3AcF15250A10A2");
  // console.log("🚀 ~ file: create-market.ts:16 ~ main ~ market:", market)

  const markets = await reader.getMarkets(addresses[networkName].DataStore, 0,10000000);
  console.log("🚀 ~ file: create-market.ts:20 ~ main ~ markets:", markets[markets.length - 1])
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
