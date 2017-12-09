pragma solidity ^0.4.2;

import '../ownership/Ownable.sol';

contract Constants is Ownable {

    uint256 public verificationRequirement;
    uint256 public pricePerStream;
    uint256 public captchaReward;
    uint256 public captchaMultiplier;

    function Constants() public {
        verificationRequirement = 3;
        pricePerStream = 200000000000000;
        captchaMultiplier = 5;
        captchaReward = captchaMultiplier*pricePerStream;
    }
    
    function setVerificationRequirement(uint256 _value) onlyOwner public {
        verificationRequirement = _value;
    }

    function setPricePerStream(uint256 _value) onlyOwner public {
        pricePerStream = _value;
        captchaReward = captchaMultiplier*pricePerStream;
    }

    function setCaptchaMultiplier(uint256 _value) onlyOwner public {
        captchaMultiplier = _value;
        captchaReward = captchaMultiplier*pricePerStream;
    }

}
