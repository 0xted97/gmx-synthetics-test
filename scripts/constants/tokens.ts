type Token = {
    [key: string]: {
        address: string;
        priceFeed?: string;
    }
}
export const tokens: { [chain: string]: Token } = {
    x1Testnet: {
        WOKB9: {
            address: "0xa2affd8301bfb3c5b815829f2f509f053556d21b",
            priceFeed: "0xA4d4B50f8372e101ad34b9E6ceBD29E7A83C60Af",
        },

        // 
        USDC: {
            address: "0xa8F7C998Ca1A9528E8f296306ebf4FD40eE14f99",
            priceFeed: "0xCF5643eee5D8d49A672F63a2FC631C1C60AEFD35"
        },
        MyToken: {
            address: "0x5E0d99a5d77Faeb5D54E5E620A5001526FFc45a0",
            priceFeed: "0x7D71d7fd2289295cd790195bcA531c58e4E76eE0"
        },
    },
    arbitrum: {
        WETH: {
            address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        },
        USDT: {
            address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        },

    }
};
