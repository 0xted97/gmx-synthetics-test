import { ethers } from "hardhat";
import { calculateCreate2 } from "eth-create2-calculator";


import { hashData, hashString } from "../utils";
import { MarketToken__factory } from "../../typechain-types";


export const DEFAULT_MARKET_TYPE = hashString("basic-v1");
export const DefaultMarket = {
    indexToken: "0xf47a68fA6f8B9d25A8A17823aBc7802E81AD472c",
    longToken: "0xf47a68fA6f8B9d25A8A17823aBc7802E81AD472c",
    shortToken: "0x059fF644Cfd298C82771d5cF9360FfdE0a81B9D5",
    type: DEFAULT_MARKET_TYPE,
}

export const markets = [
    {

    }
];


export function getMarketKey(indexToken: string, longToken: string, shortToken: string) {
    return [indexToken, longToken, shortToken].join(":");
}

export function getMarketTokenAddress(
    indexToken: string,
    longToken: string,
    shortToken: string,
    marketType: string,
    marketFactoryAddress: string,
    roleStoreAddress: string,
    dataStoreAddress: string,
): string {
    const salt = hashData(
        ["string", "address", "address", "address", "bytes32"],
        ["GMX_MARKET", indexToken, longToken, shortToken, marketType]
    );
    const byteCode = MarketToken__factory.bytecode;
    return calculateCreate2(marketFactoryAddress, salt, byteCode, {
        params: [roleStoreAddress, dataStoreAddress],
        types: ["address", "address"],
    });
}
