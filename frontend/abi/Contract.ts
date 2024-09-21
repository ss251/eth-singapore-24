export const ContractAbi = {
  _format: "hh-sol-artifact-1",
  contractName: "Contract",
  sourceName: "contracts/Contract.sol",
  abi: [
    {
      inputs: [
        {
          internalType: "contract IWorldID",
          name: "_worldId",
          type: "address",
        },
        {
          internalType: "string",
          name: "_appId",
          type: "string",
        },
        {
          internalType: "string",
          name: "_actionId",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "nullifierHash",
          type: "uint256",
        },
      ],
      name: "DuplicateNullifier",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "nullifierHash",
          type: "uint256",
        },
      ],
      name: "Verified",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "signal",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "root",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "nullifierHash",
          type: "uint256",
        },
        {
          internalType: "uint256[8]",
          name: "proof",
          type: "uint256[8]",
        },
      ],
      name: "verifyAndExecute",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  bytecode:
    "0x60e0604052600160c09081525034801561001857600080fd5b506040516109f33803806109f3833981810160405281019061003a91906102f6565b8273ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250506100cb61009f8360405160200161008591906103c8565b6040516020818303038152906040526100da60201b60201c565b826040516020016100b192919061040a565b6040516020818303038152906040526100da60201b60201c565b60a08181525050505050610490565b60006008826040516020016100ef9190610479565b6040516020818303038152906040528051906020012060001c901c9050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061015082610125565b9050919050565b600061016282610145565b9050919050565b61017281610157565b811461017d57600080fd5b50565b60008151905061018f81610169565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6101e88261019f565b810181811067ffffffffffffffff82111715610207576102066101b0565b5b80604052505050565b600061021a610111565b905061022682826101df565b919050565b600067ffffffffffffffff821115610246576102456101b0565b5b61024f8261019f565b9050602081019050919050565b60005b8381101561027a57808201518184015260208101905061025f565b60008484015250505050565b60006102996102948461022b565b610210565b9050828152602081018484840111156102b5576102b461019a565b5b6102c084828561025c565b509392505050565b600082601f8301126102dd576102dc610195565b5b81516102ed848260208601610286565b91505092915050565b60008060006060848603121561030f5761030e61011b565b5b600061031d86828701610180565b935050602084015167ffffffffffffffff81111561033e5761033d610120565b5b61034a868287016102c8565b925050604084015167ffffffffffffffff81111561036b5761036a610120565b5b610377868287016102c8565b9150509250925092565b600081519050919050565b600081905092915050565b60006103a282610381565b6103ac818561038c565b93506103bc81856020860161025c565b80840191505092915050565b60006103d48284610397565b915081905092915050565b6000819050919050565b6000819050919050565b6104046103ff826103df565b6103e9565b82525050565b600061041682856103f3565b6020820191506104268284610397565b91508190509392505050565b600081519050919050565b600081905092915050565b600061045382610432565b61045d818561043d565b935061046d81856020860161025c565b80840191505092915050565b60006104858284610448565b915081905092915050565b60805160a05160c0516105366104bd600039600060ed015260006101370152600060b001526105366000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063e9b7055314610030575b600080fd5b61004a60048036038101906100459190610307565b61004c565b005b60008083815260200190815260200160002060009054906101000a900460ff16156100ae57816040517f78ffaa260000000000000000000000000000000000000000000000000000000081526004016100a5919061037e565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16633bc778e3847f00000000000000000000000000000000000000000000000000000000000000006101348860405160200161012091906103e1565b604051602081830303815290604052610210565b867f0000000000000000000000000000000000000000000000000000000000000000876040518763ffffffff1660e01b815260040161017896959493929190610416565b60006040518083038186803b15801561019057600080fd5b505afa1580156101a4573d6000803e3d6000fd5b50505050600160008084815260200190815260200160002060006101000a81548160ff0219169083151502179055507ff786e7f77ede00a02a5464f8f0555798f42ba99a4a920ef2778db8d75e4656f782604051610202919061037e565b60405180910390a150505050565b600060088260405160200161022591906104e9565b6040516020818303038152906040528051906020012060001c901c9050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102778261024c565b9050919050565b6102878161026c565b811461029257600080fd5b50565b6000813590506102a48161027e565b92915050565b6000819050919050565b6102bd816102aa565b81146102c857600080fd5b50565b6000813590506102da816102b4565b92915050565b600080fd5b600081905082602060080282011115610301576103006102e0565b5b92915050565b600080600080610160858703121561032257610321610247565b5b600061033087828801610295565b9450506020610341878288016102cb565b9350506040610352878288016102cb565b9250506060610363878288016102e5565b91505092959194509250565b610378816102aa565b82525050565b6000602082019050610393600083018461036f565b92915050565b60008160601b9050919050565b60006103b182610399565b9050919050565b60006103c3826103a6565b9050919050565b6103db6103d68261026c565b6103b8565b82525050565b60006103ed82846103ca565b60148201915081905092915050565b82818337505050565b61041261010083836103fc565b5050565b60006101a08201905061042c600083018961036f565b610439602083018861036f565b610446604083018761036f565b610453606083018661036f565b610460608083018561036f565b61046d60a0830184610405565b979650505050505050565b600081519050919050565b600081905092915050565b60005b838110156104ac578082015181840152602081019050610491565b60008484015250505050565b60006104c382610478565b6104cd8185610483565b93506104dd81856020860161048e565b80840191505092915050565b60006104f582846104b8565b91508190509291505056fea26469706673582212200f418db0b3fd811e4dcbf19f547abcd3e9a64900d5ac96a3579a6f6d48e1d40364736f6c634300081b0033",
  deployedBytecode:
    "0x608060405234801561001057600080fd5b506004361061002b5760003560e01c8063e9b7055314610030575b600080fd5b61004a60048036038101906100459190610307565b61004c565b005b60008083815260200190815260200160002060009054906101000a900460ff16156100ae57816040517f78ffaa260000000000000000000000000000000000000000000000000000000081526004016100a5919061037e565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16633bc778e3847f00000000000000000000000000000000000000000000000000000000000000006101348860405160200161012091906103e1565b604051602081830303815290604052610210565b867f0000000000000000000000000000000000000000000000000000000000000000876040518763ffffffff1660e01b815260040161017896959493929190610416565b60006040518083038186803b15801561019057600080fd5b505afa1580156101a4573d6000803e3d6000fd5b50505050600160008084815260200190815260200160002060006101000a81548160ff0219169083151502179055507ff786e7f77ede00a02a5464f8f0555798f42ba99a4a920ef2778db8d75e4656f782604051610202919061037e565b60405180910390a150505050565b600060088260405160200161022591906104e9565b6040516020818303038152906040528051906020012060001c901c9050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102778261024c565b9050919050565b6102878161026c565b811461029257600080fd5b50565b6000813590506102a48161027e565b92915050565b6000819050919050565b6102bd816102aa565b81146102c857600080fd5b50565b6000813590506102da816102b4565b92915050565b600080fd5b600081905082602060080282011115610301576103006102e0565b5b92915050565b600080600080610160858703121561032257610321610247565b5b600061033087828801610295565b9450506020610341878288016102cb565b9350506040610352878288016102cb565b9250506060610363878288016102e5565b91505092959194509250565b610378816102aa565b82525050565b6000602082019050610393600083018461036f565b92915050565b60008160601b9050919050565b60006103b182610399565b9050919050565b60006103c3826103a6565b9050919050565b6103db6103d68261026c565b6103b8565b82525050565b60006103ed82846103ca565b60148201915081905092915050565b82818337505050565b61041261010083836103fc565b5050565b60006101a08201905061042c600083018961036f565b610439602083018861036f565b610446604083018761036f565b610453606083018661036f565b610460608083018561036f565b61046d60a0830184610405565b979650505050505050565b600081519050919050565b600081905092915050565b60005b838110156104ac578082015181840152602081019050610491565b60008484015250505050565b60006104c382610478565b6104cd8185610483565b93506104dd81856020860161048e565b80840191505092915050565b60006104f582846104b8565b91508190509291505056fea26469706673582212200f418db0b3fd811e4dcbf19f547abcd3e9a64900d5ac96a3579a6f6d48e1d40364736f6c634300081b0033",
  linkReferences: {},
  deployedLinkReferences: {},
};
