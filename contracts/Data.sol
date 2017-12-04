pragma solidity ^0.4.2;

    // metadata {
    //     hash {
    //         'artist': {
    //             'value':'A'
    //             'isVerifiesd':'true'
    //         }
    //         'title': {
    //             'value':'A'
    //             'isVerifiesd':'true'
    //         }
    //     }
    // }

    // ipfsHashMetadata {
    //     hash: {
    //         'size':0x12,
    //         'hashFunction':0x20,
    //     }
    // }

    // verifications {
    //     hash: {
    //         'artist':{
    //             'A':3,
    //             'B':2,
    //         },
    //         'title':{
    //             'R':3,
    //             'F':12,
    //         }
    //     }
    // }

    // streams {
    //     hash:120,
    // }

    // keccackHashToIPFSHash {
    //     keccak(hash):hash,
    // }

contract Tokens {
    function setOwnerTokenBalance(uint) external;
    function setPlayerAddress(address) external;
    function getPlayerAddress() view external returns (address);
    function getUserBalance(address) view external returns (uint);
    function getTrackBalance(bytes32) view external returns (uint);
    function incrementUserBalance(address, uint) external;
    function decrementUserBalance(address, uint) external;
    function incrementTrackBalance(bytes32, uint) external;
    function decrementTrackBalance(bytes32, uint) external;
}

contract Data {
    mapping (bytes32 => mapping (string => mapping (string => string))) metadata;
    mapping (bytes32 => mapping (string => bytes1)) ipfsHashMetadata;
    mapping (bytes32 => mapping (string => mapping (string => uint))) verifications;
    mapping (bytes32 => uint) streams;
    mapping (bytes32 => bytes32) keccackHashToIPFSHash;
    address owner = msg.sender;
    uint verificationRequirement = 3;
    uint captchaReward = 5;
    address tokensAddress;
    address playerAddress;
    Tokens tokens;

    event newUpload(bytes32 trackHash);

    modifier meOnly() {
        require(msg.sender == owner);
        _;
    }

    modifier playerOnly() {
        require(msg.sender == playerAddress);
        _;
    }

    function setCaptchaReward(uint newAmount) meOnly() external {
        captchaReward = newAmount;
    }

    function setVerificationRequirement(uint newAmount) meOnly() external {
        verificationRequirement = newAmount;
    }

    function setTokensAddress(address addr) meOnly() external {
        tokensAddress = addr;
        tokens = Tokens(tokensAddress);
    }

    function getTokensAddress() view external returns (address) {
        return tokensAddress;
    }

    function setPlayerAddress(address addr) meOnly() external {
        playerAddress = addr;
    }
    
    function getPlayerAddress() view external returns (address) {
        return playerAddress;
    }

    function storeMetadata(bytes32 trackHash, string key, string value, string isVerified) private {
        metadata[trackHash][key]['value'] = value;
        metadata[trackHash][key]['isVerified'] = isVerified;
    }

    function uploadMetadata(bytes32 trackHash, string key, string value, address userToPay) meOnly() external {
        verifications[trackHash][key][value] += 1;
        if (verifications[trackHash][key][value] >= verificationRequirement) {
            storeMetadata(trackHash, key, value, 'true');
        }   
        tokens.incrementUserBalance(userToPay, captchaReward);
    }

    function incrementPlayCount(bytes32 trackHash) playerOnly() external {
        streams[trackHash] += 1;
    }

    function getPlayCount(bytes32 trackHash) view external returns (uint) {
        return streams[trackHash];
    }

    function uploadTrack(bytes1 hashFunction, bytes1 size, bytes32 trackHash, string artist, string title) meOnly() external {
        // Log the event
        newUpload(trackHash);
        // Store the data
        storeMetadata(trackHash, 'artist', artist, 'false'); 
        storeMetadata(trackHash, 'title', title, 'false');
        ipfsHashMetadata[trackHash]['hashFunction'] = hashFunction;
        ipfsHashMetadata[trackHash]['size'] = size;
        keccackHashToIPFSHash[keccak256(trackHash)] = trackHash;
    }

    function getTrackBasicMetadataByHash(bytes32 trackHash, string key) view external returns (string, string) {
        return (metadata[trackHash][key]['value'], metadata[trackHash][key]['isVerified']);
    }

    function convertKeccackHashToIPFSHash(bytes32 keccakTrackHash) playerOnly() view external returns (bytes32) {
        return keccackHashToIPFSHash[keccakTrackHash];
    }

    function getIpfsHashMetadata(bytes32 trackHash) view external returns (bytes1, bytes1) {
        return (ipfsHashMetadata[trackHash]['hashFunction'], ipfsHashMetadata[trackHash]['size']);
    }
}
