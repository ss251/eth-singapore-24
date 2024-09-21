"use client";

import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { ethers } from "ethers";
import { ContractAbi } from "../abi/Contract";
import { useAccount } from "wagmi";
import { useCallback } from "react";
import { Eip1193Provider } from "ethers";

interface WorldIDWidgetProps {
  onSuccess: () => void;
}

interface Window {
  ethereum?: Eip1193Provider;
}

interface ProviderRpcError extends Error {
  code: number;
  message: string;
}

const WorldIDWidget = ({ onSuccess }: WorldIDWidgetProps) => {
  const { ethereum } = window as Window;
  const { address } = useAccount();

  const handleProof = useCallback(
    async (result: ISuccessResult) => {
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      const contractABI = ContractAbi.abi;

      // Ensure contractAddress is defined
      if (!contractAddress) {
        console.error("Contract address is not defined");
        return;
      }

      // Initialize provider and signer
      if (!ethereum) {
        console.error("Ethereum provider not found");
        return;
      }
      const provider = new ethers.BrowserProvider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // Switch to Base Sepolia network if necessary
      const { chainId } = await provider.getNetwork();
      const baseSepoliaChainId = BigInt(84531); // Base Sepolia chain ID

      if (chainId !== baseSepoliaChainId) {
        try {
          await provider.send("wallet_switchEthereumChain", [
            { chainId: "0x14A33" },
          ]);
        } catch (switchError) {
          const error = switchError as ProviderRpcError;
          if (error.code === 4902) {
            // try {
            //   await provider.send("wallet_addEthereumChain", [
            //     {
            //       chainId: "0x14A33",
            //       chainName: "Base Sepolia",
            //       nativeCurrency: {
            //         name: "Ethereum",
            //         symbol: "ETH",
            //         decimals: 18,
            //       },
            //       rpcUrls: ["https://sepolia.base.org"],
            //       blockExplorerUrls: ["https://sepolia.basescan.org"],
            //     },
            //   ]);
            // }
            try {
                await provider.send("wallet_addEthereumChain", [
                  {
                    chainId: "0x7A69",
                    chainName: "Hardhat Localhost",
                    nativeCurrency: {
                      name: "Ethereum",
                      symbol: "ETH",
                      decimals: 18,
                    },
                    rpcUrls: ["http://127.0.0.1:8545"],
                    blockExplorerUrls: [],
                },
              ]);
            } catch (addError) {
              console.error("Failed to add network:", addError);
                return;
            }
          } else {
            console.error("Failed to switch network:", switchError);
            return;
          }
        }
      }

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const { merkle_root, nullifier_hash, proof } = result;

      try {
        const tx = await contract.verifyAndExecute(
          address || "",
          merkle_root,
          nullifier_hash,
          proof
        );
        await tx.wait();
        onSuccess();
      } catch (error) {
        console.error("Error verifying proof:", error);
      }
    },
    [address, onSuccess]
  );

  return (
    <IDKitWidget
      app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
      action={process.env.NEXT_PUBLIC_ACTION || ""}
      signal={address || ""}
      onSuccess={handleProof}
      handleVerify={() => Promise.resolve()}
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
};

export default WorldIDWidget;