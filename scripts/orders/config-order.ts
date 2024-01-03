import { ethers, network } from "hardhat";
import { addresses } from "../constants/addresses";
import { getContractDataStore, getContractDepositHandler, getContractDepositVault, getContractMarketStoreUtils, getContractOrderHandler, getContractOrderVault } from "../constants/contracts";
import * as keys from "../utils/keys";
import { tokens } from "../constants/tokens";
import { MyTokenUSDCMarketToken } from "../constants/markets";

async function main() {
  const [deployer, feeWallet, keeper] = await ethers.getSigners();
  const networkName = network.name;

  // Initial data
  const marketMtUsdc = MyTokenUSDCMarketToken;

  const dataStore = await getContractDataStore(networkName);
  const orderHandler = await getContractOrderHandler(networkName);


  // Get config market
  // At least configuration keys that can sendWnt
  const wntTokenAddress = await dataStore.getFunction("getAddress")(keys.WNT);
  console.log("🚀 ~ file: config-order.ts:22 ~ main ~ wntTokenAddress:", wntTokenAddress)
  const gasTransferLimitLongToken= await dataStore.getUint(keys.tokenTransferGasLimit(marketMtUsdc.longToken));
  console.log("🚀 ~ file: config-order.ts:23 ~ main ~ gasTransferLimitLongToken:", gasTransferLimitLongToken)
  const gasTransferLimitShortToken = await dataStore.getUint(keys.tokenTransferGasLimit(marketMtUsdc.shortToken));
  console.log("🚀 ~ file: config-order.ts:24 ~ main ~ gasTransferLimitShortToken:", gasTransferLimitShortToken)
  


  // Check feature deposit handler is available?
  const disableOrderFeatureKey = keys.createDepositFeatureDisabledKey(orderHandler.target.toString());
  const disableOrderFeature = await dataStore.getBool(disableOrderFeatureKey);
  console.log("🚀 ~ file: config-order.ts:31 ~ main ~ disableOrderFeature:", disableOrderFeature)
  if (disableOrderFeature) {
    const setEnableFeatureTx = await dataStore.setBool(disableOrderFeatureKey, false);
  }
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
