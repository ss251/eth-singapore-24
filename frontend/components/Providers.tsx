'use client'

import React from "react"
import { config } from "@/lib/config"
import { WagmiProvider } from 'wagmi'
import { Web3Modal } from "@/context/Web3Modal"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <Web3Modal>
            {children}
        </Web3Modal>
      </WagmiProvider>
    </QueryClientProvider>
  )
}