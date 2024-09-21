'use client'

import { motion } from 'framer-motion'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { NounImage } from './NounImage'

export function Header() {
  const { open } = useWeb3Modal()
  const { isConnected, address } = useAccount()

  return (
    <header className="bg-nouns-bg text-nouns-text p-4 nouns-border">
      <div className="container mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <span className="text-4xl font-londrina font-bold">RealVotes</span>
          <NounImage width={48} height={48} address={address} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => open()}
            className="nouns-button text-xl px-6 py-2"
          >
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </button>
        </motion.div>
      </div>
    </header>
  )
}