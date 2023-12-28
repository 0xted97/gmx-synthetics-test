import { ethers, } from "hardhat";
import { AbiCoder } from "ethers";
import { calculateCreate2 } from "eth-create2-calculator";

import { encodeData, hashData, hashString, keccakString } from "../utils";
import { MarketToken__factory } from "../../typechain-types";


export const DEFAULT_MARKET_TYPE = hashString("basic-v1");
export const DefaultMarket = {
    indexToken: "0xf47a68fA6f8B9d25A8A17823aBc7802E81AD472c",
    longToken: "0xf47a68fA6f8B9d25A8A17823aBc7802E81AD472c",
    shortToken: "0x059fF644Cfd298C82771d5cF9360FfdE0a81B9D5",
    type: DEFAULT_MARKET_TYPE,
}

export const MyTokenUSDCMarketToken = {
    marketToken: "0x71f2412B15dE21239453b9c599d5c1406c9d24dD",
    indexToken: "0x3412f4f41614BBD34BdC3Be39cAc83f9CE72F0F7",
    longToken: "0x3412f4f41614BBD34BdC3Be39cAc83f9CE72F0F7",
    shortToken: "0xc03b237B9337099786a3D5404ED03328296ae8cE",
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
