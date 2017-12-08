pragma solidity ^0.4.2;

import './Base.sol';

contract Locations is Base {
    
    function pushDataAddress(address addr) meOnly() external {
        player.setDataAddress(addr);
        mp3.setDataAddress(addr);
    }
    
    function pushTokensAddress(address addr) meOnly() external {
        player.setMP3Address(addr);
        data.setMP3Address(addr);
    }
    
    function pushPlayerAddress(address addr) meOnly() external {
        mp3.setPlayerAddress(addr);
        data.setPlayerAddress(addr);
    }
}

