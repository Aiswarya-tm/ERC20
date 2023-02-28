// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20{

    /**
     * @dev Sets the values for {name} and {symbol}.
     * 
     * It also mints 10000 XYZ tokens to owner address.
     */
    constructor(string memory name,string memory symbol) ERC20(name,symbol){
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}