import { ethers, network } from "hardhat";
import { addresses } from "./constants/addresses";
import { getContractDataStore } from "./constants/contracts";
import * as keys from "./utils/keys";
import { tokens } from "./constants/tokens";

async function main() {
  const [deployer, feeWallet] = await ethers.getSigners();
  const networkName = network.name;
  const dataStore = await getContractDataStore(networkName);

  // Get config market
  const holderAddress = await dataStore.getFunction("getAddress")(keys.HOLDING_ADDRESS);
  const wntTokenAddress = await dataStore.getFunction("getAddress")(keys.WNT);
  console.log("🚀 ~ file: data-store.ts:14 ~ main ~ keys.WNT:", keys.HOLDING_ADDRESS)

  const gasLimitToken = await dataStore.getUint(keys.tokenTransferGasLimit(wntTokenAddress));
  
  console.log("🚀 ~ file: data-store.ts:13 ~ main ~ wntTokenAddress:", wntTokenAddress)
  console.log("🚀 ~ file: data-store.ts:10 ~ main ~ holderAddress:", holderAddress)
  console.log("🚀 ~ file: data-store.ts:16 ~ main ~ gasLimitToken:", gasLimitToken)
  
  
  
  // const setHoldingAddressTx = await dataStore.setAddress(keys.HOLDING_ADDRESS, feeWallet.address);
  // const setWntTokenAddressTx = await dataStore.setAddress(keys.WNT, tokens[networkName].WOKB9.address);
  // const setGasLimitTokenTx = await dataStore.setUint(keys.tokenTransferGasLimit(wntTokenAddress), ethers.parseUnits("0.1", 18));


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
