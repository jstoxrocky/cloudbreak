pragma solidity ^0.4.2;

import '../ownership/Ownable.sol';
import '../tokens/MP3.sol';
import '../core/Constants.sol';

contract DataSpecificAddresses is Ownable {

    address public constantsAddress;
    address public playerAddress;
    address public mp3Address;
    MP3 mp3;
    Constants constants;
    
    modifier onlyPlayer() {
      require(msg.sender == playerAddress);
      _;
    }
    
    function setPlayerAddress(address addr) onlyOwner public {
        playerAddress = addr;
    }
    
    function setMP3Address(address addr) onlyOwner public {
        mp3Address = addr;
        mp3 = MP3(mp3Address);
    }

    function setConstantsAddress(address addr) onlyOwner public {
        constantsAddress = addr;
        constants = Constants(constantsAddress);
    }


}

