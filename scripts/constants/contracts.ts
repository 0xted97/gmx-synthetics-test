import { ethers } from "hardhat";
import { addresses } from "./addresses";
import { tokens } from "./tokens";

export const getContractMarketFactory = async () => {
    const contract = await ethers.getContractAt("MarketFactory", addresses.MarketFactory);
    return contract;
}

export const getContractMarketStore = async () => {
    const contract = await ethers.getContractAt("MarketStoreUtils", addresses.MarketStoreUtils);
    return contract;
}

export const getContractDataStore = async () => {
    const contract = await ethers.getContractAt("DataStore", addresses.DataStore);
    return contract;
}

export const getContractRoleStore = async () => {
    const contract = await ethers.getContractAt("RoleStore", addresses.RoleStore);
    return contract;
}

export const getWOKB9 = async () => {
    const contract = await ethers.getContractAt("WNT", tokens.WOKB9.address);
    return contract;
}

export const getContractReader = async () => {
    const contract = await ethers.getContractAt("Reader", addresses.Reader);
    return contract;
}

export const getContractExchangeRouter = async () => {
    const contract = await ethers.getContractAt("ExchangeRouter", addresses.ExchangeRouter);
    return contract;
}

export const getContractMultiCall = async () => {
    const contract = await ethers.getContractAt("Multicall3", addresses.MultiCall);
    return contract;
}

export const getContractTokenErc20 = async (address: string) => {
    const contract = await ethers.getContractAt("TokenERC20", address);
    return contract;
}