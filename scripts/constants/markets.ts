import { ethers, } from "hardhat";
import { AbiCoder } from "ethers";
import { calculateCreate2 } from "eth-create2-calculator";

import { encodeData, hashData, hashString, keccakString } from "../utils";
import { MarketToken__factory } from "../../typechain-types";


export const DEFAULT_MARKET_TYPE = hashString("basic-v1");
export const DefaultMarket = {
    marketToken: "0xff405681d7B683429ddba7B59Eae670C4f3FBcca",
    indexToken: "0x5E0d99a5d77Faeb5D54E5E620A5001526FFc45a0",
    longToken: "0x5E0d99a5d77Faeb5D54E5E620A5001526FFc45a0",
    shortToken: "0xa8F7C998Ca1A9528E8f296306ebf4FD40eE14f99",
    type: DEFAULT_MARKET_TYPE,
}

export const MyTokenUSDCMarketToken = {
    marketToken: "0xff405681d7B683429ddba7B59Eae670C4f3FBcca",
    indexToken: "0x5E0d99a5d77Faeb5D54E5E620A5001526FFc45a0",
    longToken: "0x5E0d99a5d77Faeb5D54E5E620A5001526FFc45a0",
    shortToken: "0xa8F7C998Ca1A9528E8f296306ebf4FD40eE14f99",
    type: DEFAULT_MARKET_TYPE,
    
}

export const markets = [
    {

    }
];


export function getMarketKey(indexToken: string, longToken: string, shortToken: string) {
    return [indexToken, longToken, shortToken].join(":");
}

export async function getMarketTokenAddress(
    indexToken: string,
    longToken: string,
    shortToken: string,
    marketType: string,
    marketFactoryAddress: string,
    roleStoreAddress: string,
    dataStoreAddress: string,
): string {
    const byteCode = MarketToken__factory.bytecode;

    const salt = hashData(
        ["string", "address", "address", "address", "bytes32"],
        ["GMX_MARKET", indexToken, longToken, shortToken, marketType]
    );
  
    // const address = ethers.getCreate2Address("0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47", salt,
    //     ethers.keccak256(byteCodeTemp)
    // )
    // console.log("🚀 ~ file: markets.ts:53 ~ address:", address)

    return calculateCreate2(marketFactoryAddress, salt, byteCode, {
        params: [roleStoreAddress, dataStoreAddress],
        types: ["address", "address"],
    });
}
