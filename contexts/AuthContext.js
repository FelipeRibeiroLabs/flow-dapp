import * as fcl from "@onflow/fcl";
import { createContext, useContext, useEffect, useState } from "react";

import "../flow/config";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: false, addr: undefined });
  const [flow, setFlow] = useState(0);

  // console.log(user)

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
    if (user.addr != "") getFlow(user.addr);
  }, [user.addr]);

  const logOut = async () => {
    await fcl.unauthenticate();
    setUser({ addr: undefined, loggedIn: false });
  };

  const logIn = async () => {
    const res = await fcl.authenticate();
  };

  const signUp = () => {
    fcl.signUp();
  };

  async function getFlow(address) {
    try {
      const res = await fcl.query({
        cadence: `
              import FlowToken from 0x7e60df042a9c0868
              import FungibleToken from 0x9a0766d93b6608b7

              pub fun main(address: Address): UFix64{
                let balanceVault =  getAccount(address).getCapability(/public/flowTokenBalance).borrow<&FlowToken.Vault{FungibleToken.Balance}>()!
                return balanceVault.balance
              }`,
        args: (arg, t) => [arg(address, t.Address)],
      });
      setFlow(res);
    } catch (error) {
      console.log("err:", error);
    }
  }

  const value = {
    logOut,
    logIn,
    signUp,
    user,
    flow,
    getFlow
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}    