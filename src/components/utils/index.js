import ERC20 from "./abi/ERC20.json";

export const getTokenInstance = (tokenAddress, Web3) => {
    const web3 = Web3;
    console.log("in f from insta ",new web3.eth.Contract(ERC20.abi, tokenAddress))

    return new web3.eth.Contract(ERC20.abi, tokenAddress);
  };
  