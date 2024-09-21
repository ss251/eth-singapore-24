import { ethers } from 'ethers';
import { OasisVerificationStorageAbi } from '@/abi/OasisVerificationStorage';

export async function checkWorldIDVerification(address: string): Promise<boolean> {
  if (!address) {
    console.error('No address provided');
    return false;
  }

  // Check local storage for the nullifier hash
  const storedNullifierHash = localStorage.getItem(`worldcoin_nullifier_${address}`);

  if (storedNullifierHash) {
    // User is verified locally
    return true;
  }

  // If not verified locally, check on-chain
  try {
    const oasisStorageAddress = process.env.NEXT_PUBLIC_OASIS_VERIFICATION_STORAGE_ADDRESS;
    const rpcUrl = process.env.NEXT_PUBLIC_OASIS_RPC_URL;

    if (!oasisStorageAddress || !rpcUrl) {
      console.error('Missing environment variables');
      return false;
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const oasisStorageContract = new ethers.Contract(
      oasisStorageAddress,
      OasisVerificationStorageAbi.abi,
      provider
    );

    const isVerified = await oasisStorageContract.getVerificationStatus(address);

    if (isVerified) {
      // You may want to store the nullifier hash locally for future checks
      const nullifierHash = await oasisStorageContract.getNullifierHash(address);
      localStorage.setItem(`worldcoin_nullifier_${address}`, nullifierHash.toString());
    }

    return isVerified;
  } catch (error) {
    console.error('Error checking verification status:', error);
    return false;
  }
}