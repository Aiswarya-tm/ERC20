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
    const [chainId,setChainId] = React.useState("");

    const handleDisconnect = async()=>{
        const [primaryWallet] = onboard.state.get().wallets
        await onboard.disconnectWallet({ label: primaryWallet.label })
        setIsConnect(false);
        setChainId("")
    }



    const handleConnect = async()=>{

        const wallets = await onboard.connectWallet()
        setAccount(wallets[0].accounts[0].address)
        setIsConnect(true)
        const web3New = new Web3(wallets[0].provider)
        setWeb3(web3New)

        const [labEx] = onboard.state.get().chains
        setChainId(labEx.id)

    }

    return(
        <>  
        <div className="main-container">
            {isConnect ? 
            <Connect handleConnect={handleDisconnect} message={`Disconnect  ( ${((account?.substring(0,4)).concat("..."))?.concat(account?.substring(account?.length-4,account?.length))}  )`}/> : 
            <Connect handleConnect={handleConnect} message="Connect "/>
            }
            
            {isConnect ?<BalanceAndTransfer web3={web3} account={account} chainId={chainId}/>:""}

        </div>

        </>
    )
}
