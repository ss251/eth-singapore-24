import { ethers } from "hardhat";

async function main() {
  const worldIdRouterAddress = process.env.WORLD_ID_ROUTER_ADDRESS || ""; // World ID Router address for Base Sepolia
  const appId = process.env.NEXT_PUBLIC_APP_ID || "";
  const actionId = process.env.NEXT_PUBLIC_ACTION || "";

  const Contract = await ethers.getContractFactory("Contract");
  const contract = await Contract.deploy(worldIdRouterAddress, appId, actionId);

  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});