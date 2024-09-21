// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract OasisVerificationStorage {
    event VerificationStored(uint256 indexed nullifierHash, address indexed user);

    function storeVerification(uint256 nullifierHash) external {
        emit VerificationStored(nullifierHash, msg.sender);
    }
}