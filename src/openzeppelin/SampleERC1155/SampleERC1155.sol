// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SampleERC1155 is ERC1155, Ownable {
    constructor(address initialOwner) 
        ERC1155("Solide") 
        Ownable(initialOwner) 
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}
