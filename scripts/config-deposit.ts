import { ethers, network } from "hardhat";
import { addresses } from "./constants/addresses";
import { getContractDataStore, getContractDepositHandler, getContractDepositVault, getContractMarketStoreUtils } from "./constants/contracts";
import * as keys from "./utils/keys";
import { tokens } from "./constants/tokens";
import { MyTokenUSDCMarketToken } from "./constants/markets";
import { MarketStoreUtils__factory } from "../typechain-types";

async function main() {
  const [deployer, feeWallet] = await ethers.getSigners();
  const networkName = network.name;

  // Initial data
  const marketMtUsdc = MyTokenUSDCMarketToken;

  const dataStore = await getContractDataStore(networkName);
  const depositHandler = await getContractDepositHandler(networkName);
  const depositVault = await getContractDepositVault(networkName);


  // Get config market
  // At least configuration keys that can sendWnt
  const holderAddress = await dataStore.getFunction("getAddress")(keys.HOLDING_ADDRESS);
  const wntTokenAddress = await dataStore.getFunction("getAddress")(keys.WNT);
  const gasLimitToken = await dataStore.getUint(keys.tokenTransferGasLimit(wntTokenAddress));
  const gasLimitCallback = await dataStore.getUint(keys.MAX_CALLBACK_GAS_LIMIT);
  console.log("🚀 ~ file: config-deposit.ts:27 ~ main ~ gasLimitCallback:", gasLimitCallback)
  console.log("🚀 ~ file: data-store.ts:13 ~ main ~ wntTokenAddress:", wntTokenAddress)
  console.log("🚀 ~ file: data-store.ts:10 ~ main ~ holderAddress:", holderAddress)
  console.log("🚀 ~ file: data-store.ts:16 ~ main ~ gasLimitToken:", gasLimitToken)
  // const setHoldingAddressTx = await dataStore.setAddress(keys.HOLDING_ADDRESS, feeWallet.address);
  // const setWntTokenAddressTx = await dataStore.setAddress(keys.WNT, tokens[networkName].WOKB9.address);
  // const setGasLimitTokenTx = await dataStore.setUint(keys.tokenTransferGasLimit(wntTokenAddress), ethers.parseUnits("0.1", 18));

  // Max-min amount for deposit
  const maxAmountLongForDepositKey = keys.maxPoolAmountForDepositKey(marketMtUsdc.marketToken, marketMtUsdc.longToken);
  const maxAmountLongForDeposit = await dataStore.getUint(maxAmountLongForDepositKey);
  console.log("🚀 ~ file: config-deposit.ts:37 ~ main ~ maxAmountLongForDeposit:", maxAmountLongForDeposit)
  const maxAmountShortForDepositKey = keys.maxPoolAmountForDepositKey(marketMtUsdc.marketToken, marketMtUsdc.shortToken);
  const maxAmountShortForDeposit = await dataStore.getUint(maxAmountShortForDepositKey);
  console.log("🚀 ~ file: config-deposit.ts:39 ~ main ~ maxAmountShortForDeposit:", maxAmountShortForDeposit)
  const depositGasLimitKey = keys.depositGasLimitKey(false);
  const depositGasLimit = await dataStore.getUint(depositGasLimitKey);
  console.log("🚀 ~ file: config-deposit.ts:42 ~ main ~ depositGasLimit:", depositGasLimit)

  // Swap length
  const maxSwapLength = await dataStore.getUint(keys.MAX_SWAP_PATH_LENGTH);
  console.log("🚀 ~ file: config-deposit.ts:33 ~ main ~ maxSwapLength:", maxSwapLength)
  const gasSingleSwapKey = keys.singleSwapGasLimitKey();
  const gasSingleSwap = await dataStore.getUint(gasSingleSwapKey);
  console.log("🚀 ~ file: config-deposit.ts:46 ~ main ~ gasSingleSwap:", gasSingleSwap)




  // Check feature deposit handler is available?
  const disableDepositFeatureKey = keys.createDepositFeatureDisabledKey(depositHandler.target);
  const disableDepositFeature = await dataStore.getBool(disableDepositFeatureKey);
  console.log("🚀 ~ file: config-deposit.ts:29 ~ main ~ disableDepositFeature:", disableDepositFeature)
  if (disableDepositFeature) {
    const setEnableFeatureTx = await dataStore.setBool(disableDepositFeatureKey, false);
    console.log("🚀 ~ file: config-deposit.ts:31 ~ main ~ setEnableFeatureTx:", setEnableFeatureTx.hash)
  }

  // Check market pool available for deposit or trading
  const disableMarketKey = keys.isMarketDisabledKey(marketMtUsdc.marketToken);
  const disableMarket = await dataStore.getBool(disableMarketKey);
  console.log("🚀 ~ file: config-deposit.ts:42 ~ main ~ disableMarket:", disableMarket)
  if (disableMarket) {
    const setEnableMarketTx = await dataStore.setBool(disableMarketKey, false);
    console.log("🚀 ~ file: config-deposit.ts:45 ~ main ~ setEnableMarketTx:", setEnableMarketTx)
  }

  // Check record transfer in Vault
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
