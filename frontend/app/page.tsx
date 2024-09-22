'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { VotingSection } from '@/components/VotingSection'
import { useAccount } from 'wagmi'
import WorldIDWidget from '@/components/WorldIDWidget'
import { NounImage } from '@/components/NounImage'

const HomePage = () => {
  const { address, isConnected } = useAccount()
  const [isVerified, setIsVerified] = useState(false)
  const [nounSrc, setNounSrc] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && address) {
      const storedNullifierHash = localStorage.getItem(`worldcoin_nullifier_${address}`)
      if (storedNullifierHash) {
        setIsVerified(true)
      }
    }

    // Fetch a random Noun
    setNounSrc(`/api/noun?${new Date().getTime()}`)
  }, [address])

  const handleVerificationSuccess = () => {
    setIsVerified(true)
  }

  const handleVerificationChange = (verified: boolean) => {
    setIsVerified(verified)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-8"
      >
        <h1 className="text-6xl font-londrina font-bold text-nouns-text mr-4">RealVotes</h1>
        {nounSrc && (
          <NounImage nounSeed={nounSrc} width={64} height={64} />
        )}
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl text-center mb-12 font-pt-root text-nouns-text"
      >
        Sybil-resistant voting powered by <span className="text-nouns-accent font-bold">World ID</span> and <span className="text-nouns-blue font-bold">Oasis</span>
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
            <p className="text-xl mb-6 font-pt-root text-nouns-text">
              Prove your uniqueness with <span className="text-nouns-accent font-bold">World ID</span> to start voting!
            </p>
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
          <p className="text-xl mb-6 font-pt-root text-nouns-text">Connect your wallet to get started!</p>
        </motion.div>
      )}
    </div>
  )
}

export default HomePage