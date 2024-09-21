'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { VotingSection } from '@/components/VotingSection'
import { useAccount } from 'wagmi'
import WorldIDWidget from '@/components/WorldIDWidget'

const HomePage = () => {
  const { address, isConnected } = useAccount()
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && address) {
      const storedNullifierHash = localStorage.getItem(`worldcoin_nullifier_${address}`)
      if (storedNullifierHash) {
        setIsVerified(true)
      }
    }
  }, [address])

  const handleVerificationSuccess = () => {
    setIsVerified(true)
  }

  const handleVerificationChange = (verified: boolean) => {
    setIsVerified(verified)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-londrina font-bold text-center mb-8"
      >
        RealVotes
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl text-center mb-12"
      >
        Secure, anonymous voting powered by World ID and Oasis
      </motion.p>

      {isConnected ? (
        isVerified ? (
          <VotingSection />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-xl mb-6">Verify your identity with World ID to start voting!</p>
            <WorldIDWidget onSuccess={handleVerificationSuccess} onVerificationChange={handleVerificationChange} />
          </motion.div>
        )
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xl mb-6">Connect your wallet to get started!</p>
        </motion.div>
      )}
    </div>
  )
}

export default HomePage