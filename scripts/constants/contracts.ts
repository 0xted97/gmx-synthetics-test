import { ethers } from "hardhat";
import { addresses } from "./addresses";
import { tokens } from "./tokens";

export const getContractMarketFactory = async (network: string) => {
    const contract = await ethers.getContractAt("MarketFactory", addresses[network].MarketFactory);
    return contract;
}

export const getContractMarketStoreUtils = async (network: string) => {
    const contract = await ethers.getContractAt("MarketStoreUtils", addresses[network].MarketStoreUtils);
    return contract;
}

export const getContractDataStore = async (network: string) => {
    const contract = await ethers.getContractAt("DataStore", addresses[network].DataStore);
    return contract;
}

export const getContractRoleStore = async (network: string) => {
    const contract = await ethers.getContractAt("RoleStore", addresses[network].RoleStore);
    return contract;
}

export const getWOKB9 = async (network: string) => {
    const contract = await ethers.getContractAt("WNT", tokens[network].WOKB9.address);
    return contract;
}

export const getContractReader = async (network: string) => {
    const contract = await ethers.getContractAt("Reader", addresses[network].Reader);
    return contract;
}

export const getContractExchangeRouter = async (network: string) => {
    const contract = await ethers.getContractAt("ExchangeRouter", addresses[network].ExchangeRouter);
    return contract;
}

export const getContractRouter = async (network: string) => {
    const contract = await ethers.getContractAt("Router", addresses[network].Router);
    return contract;
}

export const getContractMultiCall = async (network: string) => {
    const contract = await ethers.getContractAt("Multicall3", addresses[network].MultiCall);
    return contract;
}

export const getContractTokenErc20 = async (address: string) => {
    const contract = await ethers.getContractAt("TokenERC20", address);
    return contract;
}

export const getContractPriceFeedTokenErc20 = async (address: string) => {
    const contract = await ethers.getContractAt("IPriceFeed", address);
    return contract;
}

export const getContractDepositHandler = async (network: string) => {
    const contract = await ethers.getContractAt("DepositHandler", addresses[network].DepositHandler);
    return contract;
}

export const getContractDepositVault = async (network: string) => {
    const contract = await ethers.getContractAt("DepositVault", addresses[network].DepositVault);
    return contract;
}

export const getContractOrderHandler = async (network: string) => {
    const contract = await ethers.getContractAt("OrderHandler", addresses[network].OrderHandler);
    return contract;
}

export const getContractOrderVault = async (network: string) => {
    const contract = await ethers.getContractAt("OrderVault", addresses[network].OrderVault);
    return contract;
}

export const getContractOracleStore = async (network: string) => {
    const contract = await ethers.getContractAt("OracleStore", addresses[network].OracleStore);
    return contract;
}

export const getContractOracle = async (network: string) => {
    const contract = await ethers.getContractAt("Oracle", addresses[network].Oracle);
    return contract;
}


export const getContractChain = async (network: string) => {
    const contract = await ethers.getContractAt("Chain", addresses[network].OrderHandler);
    return contract;
}