type Token = {
    [key: string]: {
        address: string;
        priceFeed?: string;
    }
}
export const tokens: Token = {
    WOKB9: {
        address: "0xa2affd8301bfb3c5b815829f2f509f053556d21b",
    },


    // 
    USDC: {
        address: "0x0CFE23bBfc5FEEA0Ac9462718BBD1f9C0d39ff98",
        priceFeed: ""
    },
    MyToken: {
        address: "0xE49b0330A27d928Ef246EbC33610eE7386b0b133",
        priceFeed: "0x27ED68D8cAC19f5CE76314c236752A8c9f515194"
    },

    // USDC: {
    //     address: "0x059fF644Cfd298C82771d5cF9360FfdE0a81B9D5",
    //     priceFeed: ""
    // },
    // MyToken: {
    //     address: "0xf47a68fA6f8B9d25A8A17823aBc7802E81AD472c",
    // },
    
};
