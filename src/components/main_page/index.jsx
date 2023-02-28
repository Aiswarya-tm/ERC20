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
    let web3_1;
    const getProvider = ()=>{
        let provider;
        if(window.ethereum){
            provider=window.ethereum
            
        }else{
            window.alert("No metamask present")
        }
        return provider
    }

    const handleDisconnect = ()=>{
        setIsConnect(false);
    }

    useEffect(()=>{
        console.log("web3 useEffect",web3)
    },[web3])

    useEffect(()=>{console.log("web3 isConnect usEf ",isConnect)},[isConnect])

    const handleConnect = async()=>{
        // let provider =  getProvider();
        // if(provider == window.ethereum){
        //     console.log("in click true")
        //      provider.request({
        //         method:'eth_requestAccounts',
        //     }).then(account=>{
        //         console.log("in click then")
        //         setAccount(account[0])
        //         // const sus2 = (account[0].substring(0,4)).concat("...")
        //         // setTrunck = sus2.concat(account.substring(account[0].length-4,account[0].length))
        //         setIsConnect(true)
        //     }).catch(err=>{
        //         console.log("in click error  ",err)
        //     })
        // }
        const wallets = await onboard.connectWallet()
        console.log("web3 in connect ",wallets[0].provider, wallets[0].accounts[0].address)
        setAccount(wallets[0].accounts[0].address)
        setIsConnect(true)
        const web3New = new Web3(wallets[0].provider)
        // web3_1 = web3New
        console.log("web3 after set ",web3New)
        setWeb3(web3New)

    }

    // const handleClick = async()=>{
    //     console.log("wallets connect in ")
    //     const wallets = await onboard.connectWallet()
    //     console.log("wallets connect ",wallets)
    // }

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
