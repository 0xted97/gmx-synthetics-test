import { AbiCoder, keccak256, toBeHex, getBytes } from "ethers";
const defaultAbiCoder = AbiCoder.defaultAbiCoder();

export function encodeData(types: string[], values: any[]) {
  const bytes = defaultAbiCoder.encode(types, values);
  return toBeHex(bytes);
}

export function hashData(types: string[], values: any[]) {
  const bytes = defaultAbiCoder.encode(types, values);
  const hash = keccak256(getBytes(bytes));

  return hash;
}

export function hashString(value: string) {
  return hashData(["string"], [value]);
}

export function keccakString(value: string) {
  return keccak256(getBytes(value));
}
