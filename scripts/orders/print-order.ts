import { ethers, network } from "hardhat";
import { getContractDataStore, getContractDepositVault, getContractExchangeRouter, getContractOrderHandler, getContractReader, getContractRouter, getContractTokenErc20, getWOKB9 } from "../constants/contracts";
import { addresses } from "../constants/addresses";
import * as keys from "../utils/keys";
import { BaseOrderUtils } from "../../typechain-types/contracts/exchange/OrderHandler";
import { approveToken } from "../utils/approve";
import { OkbUSDCMarketToken } from "../constants/markets";
import { hashString } from "../utils";

/**
 * Increase position of WNT + Stablecoin
 */
async function main() {
  const networkName = network.name;
  const [wallet] = await ethers.getSigners();
  const marketOkbUsdc = OkbUSDCMarketToken;

  const exchangeRouter = await getContractExchangeRouter(networkName);
  const exchangeAddress = await exchangeRouter.getAddress();

  const reader = await getContractReader(networkName);
  const dataStore = await getContractDataStore(networkName);
  const router = await getContractRouter(networkName);
  const orderHandler = await getContractOrderHandler(networkName);
  const market = await reader.getMarket(addresses[networkName].DataStore, marketOkbUsdc.marketToken);
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
