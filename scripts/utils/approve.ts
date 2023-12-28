import { TokenERC20 } from "../../typechain-types";
import { Signer, MaxUint256 } from "ethers";

export async function approveToken(token: TokenERC20, signer: Signer, spender: string): Promise<void> {
    const allowance = await token.allowance(await signer.getAddress(), spender);
    if (allowance > 0) { 
        return;
    }
    const tx = await token.connect(signer).approve(spender, MaxUint256);
    await tx.wait();
}