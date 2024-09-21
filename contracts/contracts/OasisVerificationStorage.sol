// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract OasisVerificationStorage {
    event VerificationStored(uint256 indexed nullifierHash, address indexed user);

    mapping(address => uint256) private userToNullifierHash;
    mapping(uint256 => address) private nullifierHashToUser;

    function storeVerification(uint256 nullifierHash) external {
        require(nullifierHashToUser[nullifierHash] == address(0), "Nullifier hash already used");
        require(userToNullifierHash[msg.sender] == 0, "User already verified");

        nullifierHashToUser[nullifierHash] = msg.sender;
        userToNullifierHash[msg.sender] = nullifierHash;

        emit VerificationStored(nullifierHash, msg.sender);
    }

    function getVerificationStatus(address user) external view returns (bool) {
        return userToNullifierHash[user] != 0;
    }

    function getNullifierHash(address user) external view returns (uint256) {
        return userToNullifierHash[user];
    }
}