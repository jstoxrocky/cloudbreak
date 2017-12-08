pragma solidity ^0.4.2;

import './DataSpecificAddresses.sol';

contract Data is DataSpecificAddresses {
    using SafeMath for uint256;
    
    mapping (bytes32 => mapping (string => mapping (string => string))) metadata;
    mapping (bytes32 => mapping (string => bytes1)) ipfsHashMetadata;
    mapping (bytes32 => mapping (string => mapping (string => uint256))) verifications;
    mapping (bytes32 => uint256) streams;
    mapping (bytes32 => bytes32) keccackHashToIPFSHash;


    event newUpload(bytes32 trackHash);


    function storeMetadata(bytes32 trackHash, string _key, string _value, string isVerified) private {
        metadata[trackHash][_key]['value'] = _value;
        metadata[trackHash][_key]['isVerified'] = isVerified;
    }

    function uploadMetadata(bytes32 trackHash, string _key, string _value, address userToPay) onlyOwner external {
        verifications[trackHash][_key][_value] += 1;
        if (verifications[trackHash][_key][_value] >= constants.verificationRequirement()) {
            storeMetadata(trackHash, _key, _value, 'true');
        }   
        mp3.mint(userToPay, constants.captchaReward());
    }

    function incrementPlayCount(bytes32 trackHash) onlyPlayer() external {
        streams[trackHash] = streams[trackHash].add(1);
    }

    function getPlayCount(bytes32 trackHash) view external returns (uint) {
        return streams[trackHash];
    }

    function uploadTrack(bytes1 hashFunction, bytes1 size, bytes32 trackHash, string artist, string title) onlyOwner external {
        newUpload(trackHash);
        storeMetadata(trackHash, 'artist', artist, 'false'); 
        storeMetadata(trackHash, 'title', title, 'false');
        ipfsHashMetadata[trackHash]['hashFunction'] = hashFunction;
        ipfsHashMetadata[trackHash]['size'] = size;
        keccackHashToIPFSHash[keccak256(trackHash)] = trackHash;
    }

    function getTrackBasicMetadataByHash(bytes32 trackHash, string _key) view external returns (string, string) {
        return (metadata[trackHash][_key]['value'], metadata[trackHash][_key]['isVerified']);
    }

    function convertKeccackHashToIPFSHash(bytes32 keccakTrackHash) onlyPlayer() view external returns (bytes32) {
        return keccackHashToIPFSHash[keccakTrackHash];
    }

    function getIpfsHashMetadata(bytes32 trackHash) view external returns (bytes1, bytes1) {
        return (ipfsHashMetadata[trackHash]['hashFunction'], ipfsHashMetadata[trackHash]['size']);
    }
    
}
