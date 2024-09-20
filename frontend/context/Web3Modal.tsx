// context/Web3Modal.tsx

'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { sepolia as wagmiSepolia } from 'wagmi/chains'

// Your Reown Cloud project ID
export const projectId = '6d8971954e64aacc52d257d357bbe44e'

// 2. Set chainsc
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const sepolia = {
  chainId: wagmiSepolia.id,
  name: wagmiSepolia.name,
  currency: wagmiSepolia.nativeCurrency.symbol,
  explorerUrl: wagmiSepolia.blockExplorers.default.url,
  rpcUrl: wagmiSepolia.rpcUrls.default.http[0]
}

// 3. Create a metadata object
const metadata = {
  name: 'eth-singapore-24',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, sepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return children
}