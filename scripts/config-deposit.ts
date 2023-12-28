import { ethers, network } from "hardhat";
import { addresses } from "./constants/addresses";
import { getContractDataStore, getContractDepositHandler } from "./constants/contracts";
import * as keys from "./utils/keys";
import { tokens } from "./constants/tokens";
import { MyTokenUSDCMarketToken } from "./constants/markets";

async function main() {
  const [deployer, feeWallet] = await ethers.getSigners();
  const networkName = network.name;

  // Initial data
  const marketMtUsdc = MyTokenUSDCMarketToken;
  
  const dataStore = await getContractDataStore(networkName);
  const depositHandler = await getContractDepositHandler(networkName);

  // Get config market
  // At least configuration keys that can sendWnt
  const holderAddress = await dataStore.getFunction("getAddress")(keys.HOLDING_ADDRESS);
  const wntTokenAddress = await dataStore.getFunction("getAddress")(keys.WNT);
  const gasLimitToken = await dataStore.getUint(keys.tokenTransferGasLimit(wntTokenAddress));
  console.log("🚀 ~ file: data-store.ts:13 ~ main ~ wntTokenAddress:", wntTokenAddress)
  console.log("🚀 ~ file: data-store.ts:10 ~ main ~ holderAddress:", holderAddress)
  console.log("🚀 ~ file: data-store.ts:16 ~ main ~ gasLimitToken:", gasLimitToken)
  // const setHoldingAddressTx = await dataStore.setAddress(keys.HOLDING_ADDRESS, feeWallet.address);
  // const setWntTokenAddressTx = await dataStore.setAddress(keys.WNT, tokens[networkName].WOKB9.address);
  // const setGasLimitTokenTx = await dataStore.setUint(keys.tokenTransferGasLimit(wntTokenAddress), ethers.parseUnits("0.1", 18));

  // Check feature deposit handler is available?
  const disableFeatureKey = keys.createDepositFeatureDisabledKey(depositHandler.target);
  const disableFeature = await dataStore.getBool(disableFeatureKey);
  console.log("🚀 ~ file: config-deposit.ts:29 ~ main ~ disableFeature:", disableFeature)
  if (disableFeature) {
    const setEnableFeatureTx = await dataStore.setBool(disableFeatureKey, false);
    console.log("🚀 ~ file: config-deposit.ts:31 ~ main ~ setEnableFeatureTx:", setEnableFeatureTx.hash)
  }

  // Check market pool available for deposit or trading
  const disableMarketKey = keys.isMarketDisabledKey(marketMtUsdc.marketToken);
  const disableMarket =  await dataStore.getBool(disableMarketKey);
  console.log("🚀 ~ file: config-deposit.ts:42 ~ main ~ disableMarket:", disableMarket)
  if (disableMarket) {
    const setEnableMarketTx = await dataStore.setBool(disableMarketKey, false);
    console.log("🚀 ~ file: config-deposit.ts:45 ~ main ~ setEnableMarketTx:", setEnableMarketTx)
  }

  // 

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
