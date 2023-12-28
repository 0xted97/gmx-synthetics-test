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
        },


        // 
        USDC: {
            address: "0xc03b237B9337099786a3D5404ED03328296ae8cE",
            priceFeed: "0x900ba2567632D4DD7c191C3915517E28351BBe33"
        },
        MyToken: {
            address: "0x3412f4f41614BBD34BdC3Be39cAc83f9CE72F0F7",
            priceFeed: "0x121246C5506dc010C9DAf81F7e9d0c2B85a57B45"
        },

        // USDC: {
        //     address: "0x059fF644Cfd298C82771d5cF9360FfdE0a81B9D5",
        //     priceFeed: ""
        // },
        // MyToken: {
        //     address: "0xf47a68fA6f8B9d25A8A17823aBc7802E81AD472c",
        // },

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
