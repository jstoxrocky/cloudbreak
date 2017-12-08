pragma solidity ^0.4.2;

import '../ownership/Ownable.sol';
import '../player/Player.sol';
import '../tokens/MP3.sol';
import '../core/Constants.sol';

contract TokenSpecificAddresses is Ownable {

    address public dataAddress;
    
    modifier onlyOwnerOrData() {
        require(msg.sender == owner || msg.sender == dataAddress);
        _;
    }
    
    function setDataAddress(address addr) onlyOwner public {
        dataAddress = addr;
    }

}

