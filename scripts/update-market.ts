import { ethers, network } from "hardhat";
import { getContractDataStore, getContractReader, getContractTokenErc20 } from "./constants/contracts";
import { addresses } from "./constants/addresses";

async function main() {
    const networkName = network.name;
    const reader = await getContractReader(networkName);
    const dataStore = await getContractDataStore(networkName);

    const marketsList = await reader.getMarkets(addresses[networkName].DataStore, 0, 1000);


    const markets = [];
    for await (const market of marketsList) {
        const marketData = await reader.getMarket(addresses[networkName].DataStore, market.marketToken);
        try {
            const longToken = await getContractTokenErc20(marketData.longToken);
            const shortToken = await getContractTokenErc20(marketData.shortToken);
            const pair = await longToken.symbol() + await shortToken.symbol();
            markets.push({
                marketToken: marketData.marketToken,
                pair,
            });
        } catch (error) {

        }
    }
    console.table(markets);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
