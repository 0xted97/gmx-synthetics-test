export const addresses: { [chain: string]: Record<string, string> } = {
    x1Testnet: {
        DataStore: "0x43B6C36c60Be31719323B78E71ECe2eD526862F9",
        RoleStore: "0x13370bf1d1309292343ebdfe668c7165A9BB1D7A",
        MarketFactory: "0xfE50ABB5383402089B7de87eb361D60f90D43cdB",
        MarketStoreUtils: "0xD9e9961d6Ae6C0CC712FAf61baB2caaF1f4834A9",
        ExchangeRouter: "0x730eA9B045cf932490516c333891eC5c5Bf171EB",
        Router: "0xbF5DF7b2096AA7B2aDF0961D10ee9A943A42a125",

        // Vault
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