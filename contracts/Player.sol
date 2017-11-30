pragma solidity ^0.4.2;

contract Tokens {
    function setOwnerTokenBalance(uint) external;
    function setPlayerAddress(address) external;
    function getPlayerAddress() view external returns (address);
    function getTokenBalance(address) view external returns (uint);
    function incrementUserBalance(address, uint) external;
    function decrementUserBalance(address, uint) external;
    function incrementTrackBalance(bytes32, uint) external;
    function decrementTrackBalance(bytes32, uint) external;
}

contract Data {
    function setCaptchaReward(uint) external;
    function setVerificationRequirement(uint) external;
    function setTokensAddress(address) external;
    function getTokensAddress() view external returns (address);
    function setPlayerAddress(address) external;
    function getPlayerAddress() view external returns (address);
    function uploadMetadata(bytes32, string, string, address) external;
    function incrementPlayCount(bytes32) external;
    function getPlayCount(bytes32) view external returns (uint);
    function uploadTrack(bytes1, bytes1, bytes32, string, string) external;
    function getTrackBasicMetadataByHash(bytes32, string) view external returns (string, string);
    function convertKeccackHashToIPFSHash(bytes32) view external returns (bytes32);
    function getIpfsHashMetadata(bytes32) view external returns (bytes1, bytes1);
}

contract Player {
    address owner = msg.sender;
    mapping (address => bytes32) currentTrack;
    uint pricePerStream = 2;
    Tokens tokens;
    Data data;
    address dataAddress;
    address tokensAddress;

    modifier onlyMe() {
        require(msg.sender == owner);
        _;
    }

    modifier hasEnoughTokens() {
        require(tokens.getTokenBalance(msg.sender) >= pricePerStream);
        _;
    }

    function setDataAddress(address addr) onlyMe() external {
        dataAddress = addr;
        data = Data(dataAddress);
    }
    
    function setTokensAddress(address addr) onlyMe() external {
        tokensAddress = addr;
        tokens = Tokens(tokensAddress);
    }

    function getDataAddress() view external returns (address) {
        return dataAddress;
    }
    
    function getTokensAddress() view external returns (address) {
        return tokensAddress;
    }

    function setpricePerStream(uint newAmount) onlyMe() external {
        pricePerStream = newAmount;
    }

    function stream(bytes32 keccakTrackHash) hasEnoughTokens() external returns (bytes32) {
        address listener = msg.sender;
        tokens.decrementUserBalance(listener, pricePerStream);
        bytes32 trackHash = data.convertKeccackHashToIPFSHash(keccakTrackHash);
        tokens.incrementTrackBalance(trackHash, pricePerStream);
        data.incrementPlayCount(trackHash);
        currentTrack[listener] = trackHash;
    }

    function getCurrentTrack(address listener) view external returns (bytes1, bytes1, bytes32) {
        bytes32 trackHash = currentTrack[listener];
        var (hashFunction, size) = data.getIpfsHashMetadata(trackHash);
        return (hashFunction, size, trackHash);
    }
}

