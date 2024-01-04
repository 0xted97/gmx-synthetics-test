export const addresses: { [chain: string]: Record<string, string> } = {
    x1Testnet: {
        DataStore: "0x43B6C36c60Be31719323B78E71ECe2eD526862F9",
        RoleStore: "0x13370bf1d1309292343ebdfe668c7165A9BB1D7A",
        MarketFactory: "0xfE50ABB5383402089B7de87eb361D60f90D43cdB",
        ExchangeRouter: "0x44eAb762a4036c652705b13359D8FC6EAaf57DAD",
        Router: "0xbF5DF7b2096AA7B2aDF0961D10ee9A943A42a125",
        
        // Handler
        OrderHandler: "0xCC7DbE3d2C2710AdADA7CD10eADFfaA325b00B9A",
        DepositHandler: "0xb4CF5607942516cc5afFD23194F2D68FcDB3E948",
        WithdrawalHandler:"0xe3DF88fd4560bd330FF60cdb5Cd6A88E96020485",
        AdlHandler: "0x9449cF4d1352D69d8860d525f17ee2673dECa90A",
        LiquidationHandler: "0x9eDBAca757328dee3746159016238a5dC2a5eE7B",
        
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
        Oracle: "0x95B542E9FF4B14236c125b5D16dEA5faaB05b2d4",
        OracleStore: "0x33D0D6a4f11fcb3D790766716B76e5A33C9C1b10",
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