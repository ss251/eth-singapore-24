"use client";

import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { Eip1193Provider, ethers } from "ethers";
import { OasisVerificationStorageAbi } from "../abi/OasisVerificationStorage";
import { useAccount } from "wagmi";
import { useCallback, useState, useEffect } from "react";
import { sapphireTestnet } from "wagmi/chains";

interface WorldIDWidgetProps {
  onSuccess: () => void;
  onVerificationChange: (isVerified: boolean) => void;
}

interface Window {
  ethereum?: Eip1193Provider;
}

const WorldIDWidget = ({ onSuccess, onVerificationChange }: WorldIDWidgetProps) => {
  const { address } = useAccount();
  const [status, setStatus] = useState<
    "idle" | "verifying" | "storing" | "done" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const checkVerification = useCallback(async () => {
    if (!address) {
      console.log("No address available, skipping verification check");
      return false;
    }
  
    const storedNullifierHash = localStorage.getItem(`worldcoin_nullifier_${address}`);
    if (!storedNullifierHash) {
      console.log("No stored nullifier hash found for address:", address);
      return false;
    }
  
    const oasisStorageAddress = process.env.NEXT_PUBLIC_OASIS_VERIFICATION_STORAGE_ADDRESS;
    const oasisStorageABI = OasisVerificationStorageAbi.abi;
    const rpcUrl = process.env.NEXT_PUBLIC_OASIS_RPC_URL;
  
    if (!oasisStorageAddress || !rpcUrl) {
      console.error("Missing environment variables");
      return false;
    }
  
    try {
      console.log("Connecting to RPC URL:", rpcUrl);
      const provider = new ethers.JsonRpcProvider(rpcUrl);
  
      const network = await provider.getNetwork();
      console.log("Connected to network:", network.name, "Chain ID:", network.chainId.toString());
  
      if (network.chainId !== BigInt(sapphireTestnet.id)) {
        throw new Error(`Connected to wrong network. Expected chain ID ${sapphireTestnet.id}, got ${network.chainId}`);
      }
  
      console.log("Creating contract instance at address:", oasisStorageAddress);
      const oasisStorageContract = new ethers.Contract(
        oasisStorageAddress,
        oasisStorageABI,
        provider
      );
  
      const nullifierHashBigInt = BigInt(storedNullifierHash);
      console.log("Checking for nullifier hash:", nullifierHashBigInt.toString());
  
      const latestBlock = await provider.getBlockNumber();
      console.log("Latest block number:", latestBlock);
  
      // Query only the last 1000 blocks or less
      const fromBlock = Math.max(0, latestBlock - 100);
      console.log(`Querying for VerificationStored events from block ${fromBlock} to ${latestBlock}`);
  
      const filter = oasisStorageContract.filters.VerificationStored(nullifierHashBigInt, address);
      const events = await oasisStorageContract.queryFilter(filter, fromBlock, latestBlock);
  
      const isVerified = events.length > 0;
      console.log("Verification events found:", events.length);
      console.log("Is verified:", isVerified);
  
      if (isVerified && events[0]) {
        console.log("Verification event details:", {
          blockNumber: events[0].blockNumber,
          transactionHash: events[0].transactionHash,
        });
      }
  
      return isVerified;
    } catch (error) {
      console.error("Error checking stored verification:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      return false;
    }
  }, [address]);
  
  useEffect(() => {
    const verifyStatus = async () => {
      try {
        const isVerified = await checkVerification();
        if (isVerified) {
          setStatus("done");
          setMessage("Verification already stored on Oasis network.");
          onVerificationChange(true);
          onSuccess();
        } else {
          setStatus("idle");
          onVerificationChange(false);
        }
      } catch (error) {
        console.error("Verification check failed:", error);
        setStatus("idle"); // Set to idle instead of error to allow retrying
        setMessage("Verification status unknown. Please try verifying.");
        onVerificationChange(false);
      }
    };
  
    verifyStatus();
  }, [address, checkVerification, onSuccess, onVerificationChange]);

  const handleProof = useCallback(
    async (result: ISuccessResult) => {
      console.log("World ID proof received:", result);
      setStatus("verifying");
      const oasisStorageAddress = process.env.NEXT_PUBLIC_OASIS_VERIFICATION_STORAGE_ADDRESS;
      const oasisStorageABI = OasisVerificationStorageAbi.abi;
  
      if (!oasisStorageAddress) {
        console.error("Oasis storage address is not defined");
        setMessage("Oasis storage address is not defined");
        setStatus("error");
        return;
      }
  
      const { ethereum } = window as Window;
      if (!ethereum) {
        console.error("Ethereum provider not found");
        setMessage("Ethereum provider not found");
        setStatus("error");
        return;
      }
  
      try {
        console.log("Creating BrowserProvider...");
        const provider = new ethers.BrowserProvider(ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        console.log("Signer address:", await signer.getAddress());
  
        const network = await provider.getNetwork();
        if (network.chainId !== BigInt(sapphireTestnet.id)) {
          console.error("Wrong network. Expected Oasis Sapphire Testnet.");
          setMessage("Please switch to the Oasis Sapphire Testnet in your wallet");
          setStatus("error");
          return;
        }
  
        setStatus("storing");
  
        const oasisStorageContract = new ethers.Contract(
          oasisStorageAddress,
          oasisStorageABI,
          signer
        );
  
        const nullifierHashBigInt = BigInt(result.nullifier_hash);
        console.log("Nullifier hash (BigInt):", nullifierHashBigInt.toString());
  
        const storeTx = await oasisStorageContract.storeVerification(nullifierHashBigInt);
        console.log("Transaction sent:", storeTx.hash);
        const receipt = await storeTx.wait();
        console.log("Transaction confirmed:", receipt);
  
        localStorage.setItem(`worldcoin_nullifier_${address}`, result.nullifier_hash);
  
        setStatus("done");
        setMessage("Verification stored on Oasis network.");
        onVerificationChange(true);
        onSuccess();
      } catch (error) {
        console.error("Error during verification or storage:", error);
        setMessage(error instanceof Error ? error.message : "An unknown error occurred.");
        setStatus("error");
        onVerificationChange(false);
      }
    },
    [address, onSuccess, onVerificationChange]
  );

  if (status === "done") {
    return null;
  }

  return (
    <div className="world-id-widget">
      {status === "idle" && (
        <IDKitWidget
          app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
          action={process.env.NEXT_PUBLIC_ACTION || ""}
          signal={address || ""}
          onSuccess={handleProof}
          handleVerify={() => Promise.resolve()}
          verification_level={VerificationLevel.Orb}
          autoClose
        >
          {({ open }) => (
            <button onClick={open} className="nouns-button text-2xl px-8 py-4">
              Verify with World ID
            </button>
          )}
        </IDKitWidget>
      )}
      {status === "verifying" && <p className="text-xl">Verifying your World ID...</p>}
      {status === "storing" && <p className="text-xl">Storing verification on Oasis network...</p>}
      {status === "error" && <p className="text-xl text-nouns-accent">{message}</p>}
    </div>
  );
};

export default WorldIDWidget;