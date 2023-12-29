import { ethers, network } from "hardhat";
import { getContractRoleStore } from "./constants/contracts";
import * as roles from "./utils/roles";
import { addresses } from "./constants/addresses";

async function main() {
  const networkName = network.name;
  const [wallet] = await ethers.getSigners();
  // Get role controller
  const roleStore = await getContractRoleStore(networkName);
  const isWalletController = await roleStore.hasRole(wallet.address, roles.CONTROLLER);
  if (!isWalletController) {
    const grantTx = await roleStore.grantRole(wallet.address, roles.CONTROLLER);
    console.log("🚀 ~ file: get-role.ts:13 ~ main ~ grantTx:", grantTx.hash)
  }

  // Grant controller role for ExchangeRouter
  const isExchangeController = await roleStore.hasRole(addresses[networkName].ExchangeRouter, roles.CONTROLLER);
  console.log("🚀 ~ file: get-role.ts:19 ~ main ~ isExchangeController:", isExchangeController)
  if (!isExchangeController) {
    const grantTx = await roleStore.grantRole(addresses[networkName].ExchangeRouter, roles.CONTROLLER);
  }

  // Grant controller role for [string]Handler to call [string]Utils
  const isDepositHandlerController = await roleStore.hasRole(addresses[networkName].DepositHandler, roles.CONTROLLER);
  console.log("🚀 ~ file: get-role.ts:18 ~ main ~ isDepositHandlerController:", isDepositHandlerController)
  if (!isDepositHandlerController) {
    const grantTx = await roleStore.grantRole(addresses[networkName].DepositHandler, roles.CONTROLLER);
  }
  const isWithdrawHandlerController = await roleStore.hasRole(addresses[networkName].WithdrawalHandler, roles.CONTROLLER);
  console.log("🚀 ~ file: get-role.ts:24 ~ main ~ isWithdrawHandlerController:", isWithdrawHandlerController)
  if (!isWithdrawHandlerController) {
    const grantTx = await roleStore.grantRole(addresses[networkName].WithdrawalHandler, roles.CONTROLLER);

  }


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
