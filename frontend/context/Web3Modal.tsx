// context/Web3Modal.tsx

'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { sepolia as wagmiSepolia, baseSepolia as wagmiBaseSepolia, optimismSepolia as wagmiOptimismSepolia } from 'wagmi/chains'
import { hardhatLocalhost } from '../lib/config'
// Your Reown Cloud project ID
export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || ''

// 2. Set chainsc
// const mainnet = {
//   chainId: 1,
//   name: 'Ethereum',
//   currency: 'ETH',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: 'https://cloudflare-eth.com'
// }

const sepolia = {
  chainId: wagmiSepolia.id,
  name: wagmiSepolia.name,
  currency: wagmiSepolia.nativeCurrency.symbol,
  explorerUrl: wagmiSepolia.blockExplorers.default.url,
  rpcUrl: wagmiSepolia.rpcUrls.default.http[0]
}

const optimismSepolia = {
  chainId: wagmiOptimismSepolia.id,
  name: wagmiOptimismSepolia.name,
  currency: wagmiOptimismSepolia.nativeCurrency.symbol,
  explorerUrl: wagmiOptimismSepolia.blockExplorers.default.url,
  rpcUrl: wagmiOptimismSepolia.rpcUrls.default.http[0]
}

const baseSepolia = {
  chainId: wagmiBaseSepolia.id,
  name: wagmiBaseSepolia.name,
  currency: wagmiBaseSepolia.nativeCurrency.symbol,
  explorerUrl: wagmiBaseSepolia.blockExplorers.default.url,
  rpcUrl: wagmiBaseSepolia.rpcUrls.default.http[0]
}

const localhost = {
  chainId: hardhatLocalhost.id,
  name: hardhatLocalhost.name,
  currency: hardhatLocalhost.nativeCurrency.symbol,
  explorerUrl: 'http://localhost:8545',
  rpcUrl: 'http://localhost:8545' 
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
  chains: [sepolia, baseSepolia, optimismSepolia, localhost],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return children
}