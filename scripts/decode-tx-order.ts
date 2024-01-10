import { ethers, network } from "hardhat";
import ExchangeRouter from "../artifacts/contracts/router/ExchangeRouter.sol/ExchangeRouter.json";
import OrderHandler from "../artifacts/contracts/exchange/OrderHandler.sol/OrderHandler.json";
import DepositHandler from "../artifacts/contracts/exchange/DepositHandler.sol/DepositHandler.json";
import WithdrawalHandler from "../artifacts/contracts/exchange/WithdrawalHandler.sol/WithdrawalHandler.json";


async function main() {
    const tx = "0x07c7f5aca598980a034b857beba84fdfdf236837c4c4ade92ebb8f93abfec611";
    const exchangeRouter = await ethers.getContractAt("ExchangeRouter", "0x7C68C7866A64FA2160F78EEaE12217FFbf871fa8");

    const exchangeRouterInterface = new ethers.Interface(ExchangeRouter.abi);

    const orderHandlerInterface = new ethers.Interface(OrderHandler.abi);
    const depositHandlerInterface = new ethers.Interface(DepositHandler.abi);
    const withdrawalHandlerInterface = new ethers.Interface(WithdrawalHandler.abi);

    const receipt = await ethers.provider.getTransaction(tx);
    const decode = exchangeRouterInterface.parseTransaction({ data: receipt?.data || "0x", value: receipt?.value });
    const args = decode?.args[decode?.args.length - 1];

    const decode_1 = orderHandlerInterface.parseTransaction({ data: args[2], value: receipt?.value });
    console.log("🚀 ~ file: decode-tx-order.ts:21 ~ main ~ decode_1:", decode_1)
    const decode_2 = depositHandlerInterface.parseTransaction({ data: args[2], value: receipt?.value });
    console.log("🚀 ~ file: decode-tx-order.ts:23 ~ main ~ decode_2:", decode_2)
    const decode_3 = withdrawalHandlerInterface.parseTransaction({ data: args[2], value: receipt?.value });
    console.log("🚀 ~ file: decode-tx-order.ts:25 ~ main ~ decode_3:", decode_3)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
