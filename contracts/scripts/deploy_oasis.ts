import { ethers } from "hardhat";

async function main() {
  // Deploy OasisVerificationStorage contract
  const OasisVerificationStorage = await ethers.getContractFactory("OasisVerificationStorage");
  const verificationStorage = await OasisVerificationStorage.deploy();

  await verificationStorage.waitForDeployment();
  console.log("OasisVerificationStorage deployed to:", await verificationStorage.getAddress());

  // Deploy VotingContract with the address of verificationStorage
  const VotingContract = await ethers.getContractFactory("VotingContract");
  const votingContract = await VotingContract.deploy(verificationStorage.getAddress());

  await votingContract.waitForDeployment();
  console.log("VotingContract deployed to:", await votingContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});