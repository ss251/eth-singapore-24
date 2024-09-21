export const OasisVerificationStorageAbi = {
  "_format": "hh-sol-artifact-1",
  "contractName": "OasisVerificationStorage",
  "sourceName": "contracts/OasisVerificationStorage.sol",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "nullifierHash",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "VerificationStored",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "nullifierHash",
          "type": "uint256"
        }
      ],
      "name": "storeVerification",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x6080604052348015600f57600080fd5b506101208061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063363701ba14602d575b600080fd5b60436004803603810190603f919060c2565b6045565b005b3373ffffffffffffffffffffffffffffffffffffffff16817f7e29045885d231cb4d35d23d0a5e8713534ee5670d675d1af9a147c65b21e95360405160405180910390a350565b600080fd5b6000819050919050565b60a2816091565b811460ac57600080fd5b50565b60008135905060bc81609b565b92915050565b60006020828403121560d55760d4608c565b5b600060e18482850160af565b9150509291505056fea2646970667358221220165f36093447350a1d1b0592ac88f8829eb2a893775b75f1716100946d1ff1d664736f6c634300081b0033",
  "deployedBytecode": "0x6080604052348015600f57600080fd5b506004361060285760003560e01c8063363701ba14602d575b600080fd5b60436004803603810190603f919060c2565b6045565b005b3373ffffffffffffffffffffffffffffffffffffffff16817f7e29045885d231cb4d35d23d0a5e8713534ee5670d675d1af9a147c65b21e95360405160405180910390a350565b600080fd5b6000819050919050565b60a2816091565b811460ac57600080fd5b50565b60008135905060bc81609b565b92915050565b60006020828403121560d55760d4608c565b5b600060e18482850160af565b9150509291505056fea2646970667358221220165f36093447350a1d1b0592ac88f8829eb2a893775b75f1716100946d1ff1d664736f6c634300081b0033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
