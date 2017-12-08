pragma solidity ^0.4.2;

contract _MP3 {
    function transferFromUserToTrack(address, bytes32, uint256) external returns (bool);
    function setOwnerTokenBalance(uint) external;
    function getUserBalance(address) view public returns (uint);
    function getTrackBalance(bytes32) view external returns (uint);
    function incrementUserBalance(address, uint) external;
    function setDataAddress(address) public;
    function setPlayerAddress(address) public;
}

contract _Data {
    function setCaptchaReward(uint) external;
    function setVerificationRequirement(uint) external;
    function uploadMetadata(bytes32, string, string, address) external;
    function incrementPlayCount(bytes32) external;
    function getPlayCount(bytes32) view external returns (uint);
    function uploadTrack(bytes1, bytes1, bytes32, string, string) external;
    function getTrackBasicMetadataByHash(bytes32, string) view external returns (string, string);
    function convertKeccackHashToIPFSHash(bytes32) view external returns (bytes32);
    function getIpfsHashMetadata(bytes32) view external returns (bytes1, bytes1);
    function setMP3Address(address) public;
    function setPlayerAddress(address) public;
}

contract _Player {
    function setpricePerStream(uint) external;
    function stream(bytes32) external returns (bytes32);
    function getCurrentTrack(address) view external returns (bytes1, bytes1, bytes32);
    function setDataAddress(address) public;
    function setMP3Address(address) public;
}

contract Base {
    address public owner = msg.sender;
    address public mp3Address;
    address public playerAddress;
    address public dataAddress;
    address public locationAddress;
    _MP3 mp3;
    _Data data;
    _Player player;
    
    modifier meOnly() {
        require(msg.sender == owner);
        _;
    }
    
    modifier playerOnly() {
        require(msg.sender == playerAddress);
        _;
    }
    
    modifier locationOnly() {
        require(msg.sender == locationAddress);
        _;
    }
    
    function setLocationAddress(address addr) meOnly() public {
        locationAddress = addr;
    }
    
    function setDataAddress(address addr) locationOnly() public {
        dataAddress = addr;
        data = _Data(dataAddress);
    }
    
    function setTokensAddress(address addr) locationOnly() public {
        mp3Address = addr;
        mp3 = _MP3(mp3Address);
    }
    
    function setPlayerAddress(address addr) locationOnly() public {
        playerAddress = addr;
        player = _Player(playerAddress);
    }

}
