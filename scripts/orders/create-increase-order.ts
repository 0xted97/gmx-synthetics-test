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
  const priceFeed = await getContractPriceFeedTokenErc20(tokens[networkName].MyToken.priceFeed || "");

  const latestRoundData = await priceFeed.latestRoundData();
  console.log("🚀 ~ file: create-increase-order.ts:31 ~ main ~ latestRoundData:", latestRoundData)



  const executionFee = ethers.parseEther("1.1");
  const longTokenAmount = ethers.parseUnits("2031", 18); // 2.5 My Token
  const shortTokenAmount = ethers.parseUnits("1010", 18); // 1 USDC
  const initialCollateralDeltaAmount = ethers.parseUnits("100", 18); // 1 USDC

  const totalLongTokenAmount = longTokenAmount + executionFee;


  // Transfer WNT as execution fee
  // Transfer longToken as long amount
  const longToken = await getContractTokenErc20(market[2]); // MyToken
  const shortToken = await getContractTokenErc20(market[3]); // MyUSDC
  const collateralToken = await getContractTokenErc20(market[3]); // MyUSDC
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
      initialCollateralToken: collateralToken.target.toString(),
      swapPath: [],
      uiFeeReceiver:  ethers.ZeroAddress,
    },
    numbers: {
      sizeDeltaUsd: ethers.parseUnits((100 * 10).toString(), 18), // I think leverage is x10
      triggerPrice: 0, // WETH oraclePrecision = 6, // not needed for market order
      // triggerPrice: ethers.parseUnits("2300", 6), // WETH oraclePrecision = 6, // not needed for market order
      acceptablePrice: ethers.parseUnits("2500", 6),
      executionFee,
      callbackGasLimit: 0,
      minOutputAmount: 0,
      initialCollateralDeltaAmount, // by USD
    },
    orderType: 2, // MarketIncrease
    isLong: true, // not relevant for market swap
    shouldUnwrapNativeToken: false, // not relevant for market swap
    decreasePositionSwapType: 0, // no swap
    referralCode: ethers.ZeroHash,
  };

  // Get referral address

  // Get nonce
  const nonce = await dataStore.getUint(keys.NONCE);
  console.log("🚀 ~ file: deposit-liquidity.ts:71 ~ main ~ nonce:", nonce)



  const multicallArgs = [
    exchangeRouter.interface.encodeFunctionData("sendWnt", [addresses[networkName].OrderVault, executionFee]),
    exchangeRouter.interface.encodeFunctionData("sendTokens", [collateralToken.target, addresses[networkName].OrderVault, initialCollateralDeltaAmount]), // Collateral
    exchangeRouter.interface.encodeFunctionData("createOrder", [params]),
  ];

  const testCall = await exchangeRouter.multicall.staticCall(multicallArgs, {
    value: executionFee,
    gasLimit: 10_500_000,
  });
  console.log("🚀 ~ file: deposit-liquidity.ts:86 ~ main ~ testCall:", testCall)

  const result = await exchangeRouter.multicall(multicallArgs, {
    value: executionFee,
    // gasLimit: 5_500_000,
  });
  console.log("🚀 ~ file: deposit-liquidity.ts:91 ~ main ~ result:", result)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
