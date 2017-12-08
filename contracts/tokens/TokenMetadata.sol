pragma solidity ^0.4.18;


import './ERC20Basic.sol';
import '../math/SafeMath.sol';


/**
 * @title Token Metadata
 * @dev Metadata for the token contract
 */
contract TokenMetadata {

    uint256 public totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals;
    event Transfer(address _from, address _to, uint256 _value);

    function TokenMetadata() public {
        totalSupply = 1000000000; // 1 Billion tokens
        name = 'MP3';
        symbol = 'MP3';
        decimals = 0;
    }
    
}