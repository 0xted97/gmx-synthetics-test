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

  // Get deposit of account
  const depositKeys = await dataStore.getBytes32ValuesAt(keys.accountDepositListKey(wallet.address), 0, 10000);


  const depositsData = [];
  for await (const key of depositKeys) {
    const depositInfo = await reader.getDeposit(dataStore.target, key);
    depositsData.push({
      market: depositInfo.addresses.market,
      initialLongToken: depositInfo.addresses.initialLongToken,
      initialShortToken: depositInfo.addresses.initialShortToken,
      initialLongTokenAmount: depositInfo.numbers.initialLongTokenAmount,
      initialShortTokenAmount: depositInfo.numbers.initialShortTokenAmount,
    });
  }
  console.log("Deposit records")
  console.table(depositsData);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
