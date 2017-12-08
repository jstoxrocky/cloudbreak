pragma solidity ^0.4.2;

import './Base.sol';

contract Player is Base {
    address owner = msg.sender;
    mapping (address => bytes32) currentTrack;
    uint pricePerStream = 2;

    function setpricePerStream(uint newAmount) meOnly() external {
        pricePerStream = newAmount;
    }

    function stream(bytes32 keccakTrackHash) external returns (bytes32) {
        address listener = msg.sender;
        bytes32 trackHash = data.convertKeccackHashToIPFSHash(keccakTrackHash);
        mp3.transferFromUserToTrack(listener, trackHash, pricePerStream);
        data.incrementPlayCount(trackHash);
        currentTrack[listener] = trackHash;
    }

    function getCurrentTrack(address listener) view external returns (bytes1, bytes1, bytes32) {
        bytes32 trackHash = currentTrack[listener];
        var (hashFunction, size) = data.getIpfsHashMetadata(trackHash);
        return (hashFunction, size, trackHash);
    }
}

