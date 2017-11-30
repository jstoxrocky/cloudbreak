pragma solidity ^0.4.2;

contract Tokens {
    mapping (address => uint) userBalances;
    mapping (bytes32 => uint) trackBalances;
    address owner = msg.sender;
    address playerAddress;

    modifier meOnly() {
        require(msg.sender == owner);
        _;
    }
    
    modifier playerOnly() {
        require(msg.sender == playerAddress);
        _;
    }
    
    function setOwnerTokenBalance(uint newBalance) meOnly() external {
        // TO BE REMOVED. TEST PURPOSES ONLY
        userBalances[owner] = newBalance;
    }

    function setPlayerAddress(address addr) meOnly() external {
        playerAddress = addr;
    }
        
    function getPlayerAddress() view external returns (address) {
        return playerAddress;
    }

    function getUserBalance(address user) view external returns (uint) {
        return userBalances[user];
    }

    function getTrackBalance(bytes32 trackHash) view external returns (uint) {
        return trackBalances[trackHash];
    }

    function incrementUserBalance(address user, uint value) playerOnly() external {
        userBalances[user] += value;
    }

    function decrementUserBalance(address user, uint value) playerOnly() external {
        userBalances[user] -= value;
    }

    function incrementTrackBalance(bytes32 trackHash, uint value) playerOnly() external {
        trackBalances[trackHash] += value;
    }

    function decrementTrackBalance(bytes32 trackHash, uint value) playerOnly() external {
        trackBalances[trackHash] -= value;
    }
}