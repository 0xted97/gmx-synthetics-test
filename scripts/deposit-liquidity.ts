import { ethers } from "hardhat";
import { getContractExchangeRouter, getContractMultiCall, getContractReader, getContractTokenErc20, getWOKB9 } from "./constants/contracts";
import { addresses } from "./constants/addresses";
import { DepositUtils } from "../typechain-types/contracts/exchange/DepositHandler";
import { approveToken } from "./utils/approve";

async function main() {
  const [wallet] = await ethers.getSigners();

  const exchangeRouter = await getContractExchangeRouter();
  const reader = await getContractReader();

  const marketMtUsdc = "0x2591EE1fEFb78C85b71B33210b3AcF15250A10A2";
  const market = await reader.getMarket(addresses.DataStore, marketMtUsdc);
  console.log("🚀 ~ file: deposit-liquidity.ts:15 ~ main ~ market:", market)


  const executionFee = ethers.parseEther("0.0001");
  const longTokenAmount = ethers.parseUnits("1", 18);
  const shortTokenAmount = ethers.parseUnits("1", 18); // 1 USDC

  const totalLongTokenAmount = longTokenAmount + executionFee;


  // Transfer WNT as execution fee
  // Transfer MyToken as long amount
  const myToken = await getContractTokenErc20(market[1]);
  const usdc = await getContractTokenErc20(market[2]);
  const wnt = await getWOKB9(); // wrap okb

  // await wnt.deposit({ value: ethers.parseEther("1") });
  console.log("MyToken balance %s", await myToken.balanceOf(wallet.address));
  console.log("USDC balance %s", await usdc.balanceOf(wallet.address));
  console.log("WNT balance %s", await wnt.balanceOf(wallet.address));


  const exchangeAddress = await exchangeRouter.getAddress();
  await approveToken(wnt, wallet, addresses.Router);
  await approveToken(myToken, wallet, addresses.Router);
  await approveToken(usdc, wallet, addresses.Router);


  const params: DepositUtils.CreateDepositParamsStruct = {
    receiver: wallet.address,
    callbackContract: ethers.ZeroAddress,
    market: marketMtUsdc,
    minMarketTokens: 0,
    shouldUnwrapNativeToken: false,
    executionFee: executionFee,
    callbackGasLimit: 0,
    initialLongToken: wnt.target,
    longTokenSwapPath: [],
    initialShortToken: usdc.target,
    shortTokenSwapPath: [],
    uiFeeReceiver: ethers.ZeroAddress,
  };


  const multicallArgs = [
    exchangeRouter.interface.encodeFunctionData("sendWnt", [addresses.DepositVault, executionFee]),
    exchangeRouter.interface.encodeFunctionData("sendTokens", [myToken.target, addresses.DepositVault, longTokenAmount]),
    exchangeRouter.interface.encodeFunctionData("sendTokens", [usdc.target, addresses.DepositVault, shortTokenAmount]),
    exchangeRouter.interface.encodeFunctionData("createDeposit", [params]),
  ];
  console.log("🚀 ~ file: deposit-liquidity.ts:55 ~ main ~ multicallArgs:", multicallArgs)

  const result = await exchangeRouter.multicall(multicallArgs, {
    value: executionFee
  });
  console.log("🚀 ~ file: deposit-liquidity.ts:48 ~ main ~ result:", result)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
