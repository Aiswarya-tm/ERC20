import React, { useEffect } from 'react';
import Connect from "../connect";
import Web3 from 'web3';
import BalanceAndTransfer from '../balance_transfer';
import "./main_page.css";
import {onboard} from "../../config/blocknative.js"
export default function MainPage(){

    const [isConnect,setIsConnect] = React.useState(false);
    const [account,setAccount] = React.useState();
    const [web3,setWeb3] = React.useState();
    const [label,setLabel] = React.useState();

    const handleDisconnect = async()=>{
        const [primaryWallet] = onboard.state.get().wallets
        await onboard.disconnectWallet({ label: primaryWallet.label })
        setIsConnect(false);
    }

    useEffect(()=>{
        console.log("lab is",label)
    },[label])

    const handleConnect = async()=>{

        const wallets = await onboard.connectWallet()
        console.log("web3 in connect ",wallets[0].provider, wallets[0].accounts[0].address)
        setAccount(wallets[0].accounts[0].address)
        setIsConnect(true)
        const web3New = new Web3(wallets[0].provider)
        console.log("web3 after set ",web3New)
        setWeb3(web3New)

    }

    return(
        <>  
        <div className="main-container">
            {isConnect ? 
            <Connect handleConnect={handleDisconnect} message={`Disconnect  ( ${((account?.substring(0,4)).concat("..."))?.concat(account?.substring(account?.length-4,account?.length))}  )`}/> : 
            <Connect handleConnect={handleConnect} message="Connect "/>
            }
            
            {isConnect ?<BalanceAndTransfer web3={web3} account={account}/>:""}

        </div>

        </>
    )
}
