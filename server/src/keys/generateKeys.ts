import { randomBytes } from "node:crypto";

export function generateKeys() {
  return randomBytes(32).toString("hex");
}

console.log(generateKeys());
console.log(generateKeys());
