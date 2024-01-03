export const addresses: { [chain: string]: Record<string, string> } = {
    x1Testnet: {
        DataStore: "0x43B6C36c60Be31719323B78E71ECe2eD526862F9",
        RoleStore: "0x13370bf1d1309292343ebdfe668c7165A9BB1D7A",
        MarketFactory: "0xfE50ABB5383402089B7de87eb361D60f90D43cdB",
        ExchangeRouter: "0x2A9042E67f45e1c81b00C08d990d6Dfaf8F1aDfd",
        Router: "0xbF5DF7b2096AA7B2aDF0961D10ee9A943A42a125",
        
        // Handler
        OrderHandler: "0xf19A2864C687604bab815b90713BE221909D7e0d",
        DepositHandler: "0x169abFB7054363b4a2a67612beAFbc80b05B38C9",
        WithdrawalHandler:"0xEAE24303012081fB20C20f13eAD8DdbeeDc01136",
        AdlHandler: "0x3675483B3aeB1aD766375dAE3888131CcE057b57",
        LiquidationHandler: "0xb9c4DAc15f28288aA0B661bFE83EA6e0C9e39594",
        
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

        // Oracle
        Oracle: "0xe5e2D3AbC89777f1DBf188E4A52Db847f56235cf",
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