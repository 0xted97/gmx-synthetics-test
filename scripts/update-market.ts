import { ethers } from "hardhat";
import { getContractMarketFactory, getContractReader } from "./constants/contracts";
import { DefaultMarket, getMarketTokenAddress } from "./constants/markets";
import { addresses } from "./constants/addresses";

async function main() {
    const reader = await getContractReader();
    const marketAddress = "0x2591EE1fEFb78C85b71B33210b3AcF15250A10A2";

    const market = await reader.getMarket(addresses.DataStore, marketAddress);
    
    console.log("🚀 ~ file: update-market.ts:11 ~ main ~ market:", market)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
