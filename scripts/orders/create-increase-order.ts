import { ethers, network } from "hardhat";
import { getContractDataStore, getContractDepositVault, getContractExchangeRouter, getContractOrderHandler, getContractPriceFeedTokenErc20, getContractReader, getContractRouter, getContractTokenErc20, getWOKB9 } from "../constants/contracts";
import { addresses } from "../constants/addresses";
import * as keys from "../utils/keys";
import { BaseOrderUtils } from "../../typechain-types/contracts/exchange/OrderHandler";
import { approveToken } from "../utils/approve";
import { MyTokenUSDCMarketToken } from "../constants/markets";
import { hashString } from "../utils";
import { tokens } from "../constants/tokens";

/**
 * Increase position of WNT + Stablecoin
 */
async function main() {
  const networkName = network.name;
  const [wallet] = await ethers.getSigners();
  const marketOkbUsdc = MyTokenUSDCMarketToken;

  const exchangeRouter = await getContractExchangeRouter(networkName);
  const exchangeAddress = await exchangeRouter.getAddress();

  const reader = await getContractReader(networkName);
  const dataStore = await getContractDataStore(networkName);
  const router = await getContractRouter(networkName);
  const orderHandler = await getContractOrderHandler(networkName);
  const market = await reader.getMarket(addresses[networkName].DataStore, marketOkbUsdc.marketToken);
  console.log("🚀 ~ file: deposit-liquidity.ts:23 ~ main ~ market:", market)
  const priceFeed = await getContractPriceFeedTokenErc20(tokens[networkName].MyToken.priceFeed || "");

  const latestRoundData = await priceFeed.latestRoundData();
  console.log("🚀 ~ file: create-increase-order.ts:31 ~ main ~ latestRoundData:", latestRoundData)



  const executionFee = ethers.parseEther("0.001");
  const longTokenAmount = ethers.parseUnits("1200", 18); // 2.5 My Token
  const shortTokenAmount = ethers.parseUnits("1000", 18); // 1 USDC

  const totalLongTokenAmount = longTokenAmount + executionFee;


  // Transfer WNT as execution fee
  // Transfer longToken as long amount
  const longToken = await getContractTokenErc20(market[2]); // MyToken
  console.log("🚀 ~ file: create-increase-order.ts:45 ~ main ~ longToken:", longToken.target)
  const shortToken = await getContractTokenErc20(market[3]); // MyUSDC
  const wnt = await getWOKB9(networkName); // wrap okb

  // await wnt.deposit({ value: ethers.parseEther("1") });
  console.log("LongToken(%s) balance %s %s", await longToken.name(), await longToken.decimals(), await longToken.balanceOf(wallet.address));
  console.log("ShortToken(%s) balance %s %s", await shortToken.name(), await shortToken.decimals(), await shortToken.balanceOf(wallet.address));
  console.log("WNT balance %s", await wnt.balanceOf(wallet.address));
  console.log("Exchange router WNT balance %s", await wnt.balanceOf(exchangeAddress));


  // await approveToken(wnt, wallet, exchangeAddress);
  await approveToken(wnt, wallet, router.target.toString());
  await approveToken(longToken, wallet, router.target.toString());
  await approveToken(shortToken, wallet, router.target.toString());


  const params: BaseOrderUtils.CreateOrderParamsStruct = {
    addresses: {
      receiver: wallet.address,
      callbackContract: ethers.ZeroAddress,
      market: marketOkbUsdc.marketToken,
      initialCollateralToken: longToken.target.toString(),
      swapPath: [],
      uiFeeReceiver:  ethers.ZeroAddress,
    },
    numbers: {
      sizeDeltaUsd: ethers.parseUnits("20", 30),
      triggerPrice: ethers.parseUnits("1", 6), // WETH oraclePrecision = 8
      acceptablePrice: ethers.parseUnits("1", 30),
      executionFee,
      callbackGasLimit: 0,
      minOutputAmount: 0,
      initialCollateralDeltaAmount: 0,
    },
    orderType: 2, // MarketIncrease
    isLong: true, // not relevant for market swap
    shouldUnwrapNativeToken: false, // not relevant for market swap
    decreasePositionSwapType: 0, // no swap
    referralCode: ethers.ZeroHash,
  };

  // Get referral address
  const referral = await orderHandler.referralStorage();
  console.log("🚀 ~ file: create-increase-order.ts:82 ~ main ~ referral:", referral)

  // Get nonce
  const nonce = await dataStore.getUint(keys.NONCE);
  console.log("🚀 ~ file: deposit-liquidity.ts:71 ~ main ~ nonce:", nonce)



  const multicallArgs = [
    exchangeRouter.interface.encodeFunctionData("sendWnt", [addresses[networkName].OrderVault, executionFee]),
    exchangeRouter.interface.encodeFunctionData("sendTokens", [longToken.target, addresses[networkName].OrderVault, longTokenAmount]), // Collateral
    exchangeRouter.interface.encodeFunctionData("createOrder", [params]),
  ];

  const testCall = await exchangeRouter.multicall.staticCall(multicallArgs, {
    value: executionFee,
    gasLimit: 8000000
  });
  console.log("🚀 ~ file: deposit-liquidity.ts:86 ~ main ~ testCall:", testCall)

  const result = await exchangeRouter.multicall(multicallArgs, {
    value: executionFee,
    // gasLimit: 2_500_000,
  });
  console.log("🚀 ~ file: deposit-liquidity.ts:91 ~ main ~ result:", result)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
