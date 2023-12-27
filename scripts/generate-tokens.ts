import { ethers } from "hardhat";
import { addresses } from "./constants/addresses";

async function main() {
    const TokenERC20 = await ethers.getContractFactory("TokenERC20");
    const myToken = await TokenERC20.deploy("My Token", "MT");

    const USDC = await TokenERC20.deploy("USDC stablecoin", "USDC");

    const PriceFeedToken = await ethers.getContractFactory("PriceFeedToken");
    const myTokenPriceFeed = await PriceFeedToken.deploy(
        addresses.OracleService,
        addresses.DataSource,
        "ETH", // Example price of ETH
    );
    await Promise.all([
        myToken.waitForDeployment(),
        myTokenPriceFeed.waitForDeployment(),
        USDC.waitForDeployment(),
    ]);

    const usdcAddress = await USDC.getAddress();
    const tokenAddress = await myToken.getAddress();
    const tokenPriceFeedAddress = await myTokenPriceFeed.getAddress();
    console.log("🚀 ~ USDC address is ", usdcAddress);
    console.log("🚀 ~ MyToken address is ", tokenAddress);
    console.log("🚀 ~ MyToken price feed address is", tokenPriceFeedAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
