import { ethers, network } from "hardhat";
import { getContractMarketFactory, getContractRoleStore } from "./constants/contracts";
import * as roles from "./utils/roles";

async function main() {
  const networkName = network.name;
  const [wallet] = await ethers.getSigners();
  // Get role controller
  const roleStore = await getContractRoleStore(networkName);
  const isController = await roleStore.hasRole(wallet.address, roles.CONTROLLER);
  if (!isController) {
    const grantTx = await roleStore.grantRole(wallet.address, roles.CONTROLLER);
    console.log("🚀 ~ file: get-role.ts:13 ~ main ~ grantTx:", grantTx.hash)

  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
