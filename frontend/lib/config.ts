import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { baseSepolia, sepolia } from 'wagmi/chains'
import { Chain } from 'wagmi/chains'

// Add necessary networks
export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

if (!projectId) throw new Error('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not defined')

export const metadata = {
  name: 'Onboard Agent',
  description: 'AI Powered Web3 Onboarding Agent',
  url: 'https://onboardagent.vercel.app',
  icons: []
}

export const hardhatLocalhost: Chain = {
    id: 31337,
    name: 'Hardhat Localhost',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['http://127.0.0.1:8545'],
      },
      public: {
        http: ['http://127.0.0.1:8545'],
      },
    },
  }

// Create wagmiConfig
export const chains = [baseSepolia, sepolia, hardhatLocalhost] as const // Include all supported chains
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})