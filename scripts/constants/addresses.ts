export const addresses: { [chain: string]: Record<string, string> } = {
    x1Testnet: {
        DataStore: "0x43B6C36c60Be31719323B78E71ECe2eD526862F9",
        RoleStore: "0x13370bf1d1309292343ebdfe668c7165A9BB1D7A",
        MarketFactory: "0xfE50ABB5383402089B7de87eb361D60f90D43cdB",
        ExchangeRouter: "0xCf51052545BD70b650e5ae1cc4B40d2Ae21A3afc",
        Router: "0xbF5DF7b2096AA7B2aDF0961D10ee9A943A42a125",
        
        // Handler
        OrderHandler: "0x45bab18BCcBf50e8b8C8e3b4737e96d3cd95d6e9",
        DepositHandler: "0xfa86BE1d6493Dd607Dc9B01564C667c17c54E835",
        WithdrawalHandler:"0x19feE34A9C77Fa3F0f701e692D052A2f3457Eb2e",
        
        // Utils
        MarketStoreUtils: "0xD9e9961d6Ae6C0CC712FAf61baB2caaF1f4834A9",
        MarketUtils: "0x54e815D006A5e0Ed8E7dCe7a76F7AD16acD79162",

        // Vault
        OrderVault: "0xd5C5E703167d4Cc444C4E6132aBC3BBB5f798b7D",
        DepositVault: "0x706c58e1eFc47D1aA4cf1601eCA25eb897f9d9dE",

        // MultiCall
        MultiCall: "0x163339689B9a4E2ba879562945e047ed900126E1",

        // Read
        Reader: "0x76fe0055e2F245EB7F15F3C47eF690b85cd1087c",


        // X1 PriceFeed
        OracleService: "0x64481ebfFe69d688d754e09918e82C89D8Da2507",
        DataSource: "0x6cf2a39d1c85adfb50da183060dc0d46529f3f9c"
    },
    arbitrum: {
        DataStore: "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8",
        RoleStore: "0x3c3d99FD298f679DBC2CEcd132b4eC4d0F5e6e72",
        MarketFactory: "0xf5F30B10141E1F63FC11eD772931A8294a591996",

        // Read
        Reader: "0xf60becbba223EEA9495Da3f606753867eC10d139",
    }
}