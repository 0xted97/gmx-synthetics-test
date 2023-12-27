import { ethers } from "hardhat";
import { addresses } from "./constants/addresses";
import { getContractDataStore } from "./constants/contracts";
import { gasLimitTransferTokenKey } from "./utils/keys";

async function main() {
  const dataStore = await getContractDataStore();
  console.log("🚀 ~ file: data-store.ts:9 ~ main ~ gasLimitTransfer", gasLimitTransferTokenKey("0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"))
  const data = await dataStore.getUint(gasLimitTransferTokenKey("0xa2affd8301bfb3c5b815829f2f509f053556d21b"))
  console.log("🚀 ~ file: data-store.ts:9 ~ main ~ data:", data)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
