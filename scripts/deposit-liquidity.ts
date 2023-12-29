import { ethers, network } from "hardhat";
import { getContractDepositVault, getContractExchangeRouter, getContractReader, getContractRouter, getContractTokenErc20, getWOKB9 } from "./constants/contracts";
import { addresses } from "./constants/addresses";
import { DepositUtils } from "../typechain-types/contracts/exchange/DepositHandler";
import { approveToken } from "./utils/approve";
import { MyTokenUSDCMarketToken } from "./constants/markets";

/**
 * Deposit WNT + Stablecoin
 */
async function main() {
  const networkName = network.name;
  const [wallet] = await ethers.getSigners();
  const marketMtUsdc = MyTokenUSDCMarketToken;

  const exchangeRouter = await getContractExchangeRouter(networkName);
  const exchangeAddress = await exchangeRouter.getAddress();

  const reader = await getContractReader(networkName);
  const router = await getContractRouter(networkName);
  const depositVault = await getContractDepositVault(networkName);
  const market = await reader.getMarket(addresses[networkName].DataStore, marketMtUsdc.marketToken);


  const executionFee = ethers.parseEther("0.01");
  const longTokenAmount = ethers.parseUnits("2.5", 18);
  const shortTokenAmount = ethers.parseUnits("1", 18); // 1 USDC

  const totalLongTokenAmount = longTokenAmount + executionFee;


  // Transfer WNT as execution fee
  // Transfer MyToken as long amount
  const myToken = await getContractTokenErc20(market[1]);
  const usdc = await getContractTokenErc20(market[2]);
  const wnt = await getWOKB9(networkName); // wrap okb

  // await wnt.deposit({ value: ethers.parseEther("1") });
  console.log("MyToken balance %s %s", await myToken.decimals(), await myToken.balanceOf(wallet.address));
  console.log("USDC balance %s %s", await usdc.decimals(), await usdc.balanceOf(wallet.address));
  console.log("WNT balance %s", await wnt.balanceOf(wallet.address));
  console.log("Exchange router WNT balance %s", await wnt.balanceOf(exchangeAddress));


  // await approveToken(wnt, wallet, exchangeAddress);
  await approveToken(wnt, wallet, router.target.toString());
  await approveToken(myToken, wallet, router.target.toString());
  await approveToken(usdc, wallet, router.target.toString());


  const params: DepositUtils.CreateDepositParamsStruct = {
    receiver: wallet.address,
    callbackContract: ethers.ZeroAddress,
    market: marketMtUsdc.marketToken,
    minMarketTokens: 0,
    shouldUnwrapNativeToken: false,
    executionFee: executionFee,
    callbackGasLimit: 0,
    initialLongToken: myToken.target,
    longTokenSwapPath: [],
    initialShortToken: usdc.target,
    shortTokenSwapPath: [],
    uiFeeReceiver: ethers.ZeroAddress,
  };

  // Check record transfer
  const initialLongTokenAmount = await depositVault.tokenBalances(params.initialLongToken);
  console.log("🚀 ~ file: deposit-liquidity.ts:68 ~ main ~ initialLongTokenAmount:", initialLongTokenAmount)
  const initialShortTokenAmount = await depositVault.tokenBalances(params.initialShortToken);
  console.log("🚀 ~ file: deposit-liquidity.ts:70 ~ main ~ initialShortTokenAmount:", initialShortTokenAmount)
  // const syncBalanceLong = await depositVault.syncTokenBalance(params.initialLongToken);
  // const syncBalanceShort = await depositVault.syncTokenBalance(params.initialShortToken);



  const multicallArgs = [
    exchangeRouter.interface.encodeFunctionData("sendWnt", [addresses[networkName].DepositVault, executionFee]),
    exchangeRouter.interface.encodeFunctionData("sendTokens", [myToken.target, addresses[networkName].DepositVault, longTokenAmount]),
    exchangeRouter.interface.encodeFunctionData("sendTokens", [usdc.target, addresses[networkName].DepositVault, shortTokenAmount]),
    exchangeRouter.interface.encodeFunctionData("createDeposit", [params]),
  ];

  const testCall = await exchangeRouter.multicall.staticCall(multicallArgs, {
    value: executionFee,
    gasLimit: 8000000
  });
  console.log("🚀 ~ file: deposit-liquidity.ts:86 ~ main ~ testCall:", testCall)

  const result = await exchangeRouter.multicall(multicallArgs, {
    value: executionFee,
    // gasLimit: 8000000,
  });
  console.log("🚀 ~ file: deposit-liquidity.ts:91 ~ main ~ result:", result)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
