import { ethers, network } from "hardhat";
import { addresses } from "./constants/addresses";

async function main() {
    const networkName = network.name;
    const TokenERC20 = await ethers.getContractFactory("TokenERC20");
    const myToken = await TokenERC20.deploy("My Token", "MT");

    const USDC = await TokenERC20.deploy("USDC stablecoin", "USDC");

    const PriceFeedToken = await ethers.getContractFactory("PriceFeedToken");
    const myTokenPriceFeed = await PriceFeedToken.deploy(
        addresses[networkName].OracleService,
        addresses[networkName].DataSource,
        "ETH", // Example price of ETH
    );
    const usdcPriceFeed = await PriceFeedToken.deploy(
        addresses[networkName].OracleService,
        addresses[networkName].DataSource,
        "USDC", // Example price of ETH
    );
    await Promise.all([
        myToken.waitForDeployment(),
        myTokenPriceFeed.waitForDeployment(),
        USDC.waitForDeployment(),
        usdcPriceFeed.waitForDeployment(),
    ]);

    const usdcAddress = await USDC.getAddress();
    const tokenAddress = await myToken.getAddress();
    const tokenPriceFeedAddress = await myTokenPriceFeed.getAddress();
    const usdcPriceFeedAddress = await usdcPriceFeed.getAddress();
    console.log("🚀 ~ USDC address is ", usdcAddress);
    console.log("🚀 ~ USDC price feed is ", usdcPriceFeedAddress);
    console.log("🚀 ~ MyToken address is ", tokenAddress);
    console.log("🚀 ~ MyToken price feed address is", tokenPriceFeedAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
