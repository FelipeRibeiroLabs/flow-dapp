import React, { useState, useContext } from "react";
import * as fcl from "@onflow/fcl";
import {send as fclSend, decode, getTransactionStatus} from "@onflow/sdk"

// ----------- SCRIPTS  -----------
import { getOrbiesScript } from "../flow/cadence/getOrbiesScript";
import { getOrbiesTransaction } from "../flow/cadence/mintOrbieTransaction";
import serverAuthorization from "../util/Authorization";

import "../flow/config";

export const NftsContext = React.createContext("");
export const useNFTs = () => useContext(NftsContext);

export default function NftsProvider({ children }){
    const [Orbies, setOrbies] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [txId, setTxId] = useState("");
    const [status, setStatus] = useState("");

    const getOrbies = async (addr) => {   
    try {
        const res = await fcl.query({
        cadence: getOrbiesScript,
        args: (arg, t) => [arg(addr, t.Address)],
        });
        setOrbies(res);
    } catch (error) {
        console.log("err:", error);
    }}

    const mintOrbie = async (name, description, thumbnail, type, addr) => {
    setIsLoading(true);

    try {
        const txid = await fcl.mutate({
        cadence: getOrbiesTransaction,
        args: (arg, t) => [
            arg(name, t.String),
            arg(description, t.String),
            arg(thumbnail, t.String),
            arg(type, t.String),
        ],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser, serverAuthorization],
        limit: 999,
        });

        setTxId(txid);
        // const resultTest = await fclSend([getTransactionStatus(txid)]).then(decode)
        // while(resultTest.status != 4){
        //     resultTest = await fclSend([getTransactionStatus(txid)]).then(decode)
        //     console.log("TESTEEE",resultTest)
        // }

        fcl.tx(txid).subscribe((res) => {
            setStatus(res);
            console.log("TESTANDO RESSSS FROM FCL", res.status)

        if (res.status === 4) {
            setIsLoading(false);
            getOrbies(addr)
        }});
        console.log("txid", txid);
    } catch (error) {
        setIsLoading(false);
        console.log("err", error);
    }
    };

    const value = {
    Orbies,
    getOrbies,
    mintOrbie,
    IsLoading,
    setIsLoading,
    txId,
    status
    };

    return (
    <NftsContext.Provider value={value}> {children} </NftsContext.Provider>
    );
};