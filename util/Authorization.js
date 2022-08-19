import * as fcl from "@onflow/fcl";
const { SHA3 } = require("sha3");
var EC = require('elliptic').ec;
var ec = new EC('p256');

const PRIVATE_KEY = "9547aaf649ab6ca2ee45a03148a5b5b937c30c4e960df7c0abb3dc443fdca42e"
const ADDRESS = "0x2646896ede3e5811"

const sign = (message) => {
  const key = ec.keyFromPrivate(Buffer.from(PRIVATE_KEY, "hex"));
  const sig = key.sign(hash(message)); // hashMsgHex -> hash
  const n = 32;
  const r = sig.r.toArrayLike(Buffer, "be", n);
  const s = sig.s.toArrayLike(Buffer, "be", n);
  return Buffer.concat([r, s]).toString("hex");
}

const hash = (message) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(message, "hex"));
  return sha.digest();
}

const serverAuthorization = async (account) => {

  const addr = ADDRESS;
  const keyId = 0;

  return {
    ...account,
    tempId: `${addr}-${keyId}`,
    addr: fcl.sansPrefix(ADDRESS),
    keyId: Number(keyId),
    signingFunction: async (signable) => {
      return {
        addr: fcl.withPrefix(addr),
        keyId: Number(keyId),
        signature: sign(signable.message)
      }
    }
  }
}

export default serverAuthorization;
        