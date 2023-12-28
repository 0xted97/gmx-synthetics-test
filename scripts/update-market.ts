import { ethers, network } from "hardhat";
import { getContractDataStore, getContractMarketFactory, getContractReader } from "./constants/contracts";
import { DefaultMarket, getMarketTokenAddress } from "./constants/markets";
import { addresses } from "./constants/addresses";

async function main() {
    const networkName = network.name;
    const reader = await getContractReader(networkName);
    const dataStore = await getContractDataStore(networkName);
    console.log("🚀 ~ file: update-market.ts:11 ~ main ~ DefaultMarket.type:", DefaultMarket.type)
    const marketAddress = getMarketTokenAddress("0xB46A094Bc4B0adBD801E14b9DB95e05E28962764", "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", DefaultMarket.type, "0xf5F30B10141E1F63FC11eD772931A8294a591996", "0x3c3d99FD298f679DBC2CEcd132b4eC4d0F5e6e72", "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8");
    console.log("🚀 ~ file: update-market.ts:10 ~ main ~ marketAddress:", marketAddress)

    const market = await reader.getMarket(addresses[networkName].DataStore, marketAddress);

    console.log("🚀 ~ file: update-market.ts:11 ~ main ~ market:", market)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
