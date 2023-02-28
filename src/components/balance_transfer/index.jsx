import React, { useEffect, useState } from "react";
import Input from "../input";
import { getTokenInstance } from "../utils";
import "./balance_transfer.css";

export default function BalanceAndTransfer({ web3, account }) {
  const [tokenaddressTocheckbalance, setTokenAddressToCheckBalance] =
    useState("");
  const [balance, setBalance] = useState("");
  const [tokenAddressToTransfer, setTokenAddressToTransfer] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [symbol, setSymbol] = useState("");
  const [hash,sethash] = useState("")

  const handleBalanceAddress = (e) => {
    setTokenAddressToCheckBalance(e.target.value.trim());
  };
  const handleToransferTokenAddressChange = (e) => {
    setTokenAddressToTransfer(e.target.value);
  };
  const handleToAddressChange = (e) => {
    setToAddress(e.target.value);
  };
  const handleTokenAmountChange = (e) => {
    setTokenAmount(e.target.value);
  };
  const fetchBalance = async () => {
    //TODO check correct address or not
    const tokenInstance = await getTokenInstance(
      tokenaddressTocheckbalance,
      web3
    );
    tokenInstance.methods
      .balanceOf(account)
      .call()
      .then((res) => {
        setBalance(res);
      });
    let symbol_var = await tokenInstance.methods.symbol().call();
    setSymbol(symbol_var);
  };
  const handleTransfer = async () => {
    const tokenInstance = await getTokenInstance(
      tokenaddressTocheckbalance,
      web3
    );
    console.log("in f in send")
    tokenInstance.methods.transfer(toAddress,tokenAmount).send({from:account}).then((txnHash)=>{
        // sethash(txnHash.transactionHash)
        console.log("in f hash is",txnHash.transactionHash);
    })
  };

  return (
    <React.Fragment>
      <h2>Check Balance</h2>
      <div className="bal-pag-con">
        <div className="bal-pag-content">
          <p>
            Used to calculate the amount of ERC20token the connector user holds.
            User has to simply specify the token address whose balance has to be
            calculated.
            <br />
            Only after token address is entered button will be enabled.
          </p>
        </div>
        <div className="check-bal-inp-con">
          <p className="name-above-text">Enter Token Address *</p>
          <Input
            type="text"
            value={tokenaddressTocheckbalance}
            placeholder="Token Address"
            handleFunction={handleBalanceAddress}
          />
          {balance.length > 0 ? (
            <p className="bal-text name-above-text">
              Balance is {balance} {symbol}
            </p>
          ) : (
            ""
          )}
          <button
            className="custom-button"
            onClick={fetchBalance}
            disabled={tokenaddressTocheckbalance.length > 0 ? false : true}
          >
            Check
          </button>
        </div>
      </div>

      <h2>Transfer Token</h2>
      <div className="bal-pag-con">
        <div className="check-bal-inp-con">
          <p className="name-above-text">Enter Token Address *</p>
          <Input
            type="text"
            value={tokenAddressToTransfer}
            placeholder="Token Address"
            handleFunction={handleToransferTokenAddressChange}
          />

          <p className="name-above-text">Enter To Address *</p>
          <Input
            type="text"
            value={toAddress}
            placeholder="Account Address"
            handleFunction={handleToAddressChange}
          />

          <p className="name-above-text">Enter Amount *</p>
          <Input
            type="text"
            value={tokenAmount}
            placeholder="Token Amount"
            handleFunction={handleTokenAmountChange}
          />
          <button
            onClick={handleTransfer}
            className="custom-button"
            disabled={
              toAddress.length > 0 &&
              tokenAddressToTransfer.length > 0 &&
              tokenAmount.length > 0
                ? false
                : true
            }
          >
            Transfer
          </button>
          {hash.length>0 ?<a target="_blank" rel="noopener" href={`https://goerli.etherscan.io/tx/${hash}`}>View transaction</a>:""}
        </div>
        <div className="bal-pag-content">
          <p>
            Used to transfer ERC20 token to a different account. User has to
            specify the address of the token that has to be transferred along
            with the address to which transfer has to be initiated. User also
            has to specify the amount to be transferred in wei.
            <br />
            Only after all the field are entered button will be enabled.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
