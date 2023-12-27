import { AbiCoder, keccak256, hexlify, toUtf8Bytes, toBeArray } from "ethers";
const defaultAbiCoder = new AbiCoder();

export function encodeData(types: string[], values: any[]) {
  const bytes = defaultAbiCoder.encode(types, values);
  return hexlify(bytes);
}

export function hashData(types: string[], values: any[]) {
  const bytes = defaultAbiCoder.encode(types, values);
  const hash = keccak256(toBeArray(bytes));

  return hash;
}

export function hashString(value: string) {
  return hashData(["string"], [value]);
}

export function keccakString(value: string) {
  return keccak256(toUtf8Bytes(value));
}
