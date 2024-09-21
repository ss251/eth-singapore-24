'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ethers } from 'ethers'
import { VotingContractAbi } from '@/abi/VotingContract'

const votingOptions = [
  { id: 1, title: "Add a Skateboard Accessory", description: "Give Nouns the ability to shred!" },
  { id: 2, title: "Implement Rainbow Background", description: "Make Nouns more colorful!" },
  { id: 3, title: "Introduce Pirate Hat", description: "Arrr! Nouns want to sail the seven seas!" },
]

export function VotingSection() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isVoting, setIsVoting] = useState(false)
  const [votingResult, setVotingResult] = useState<string | null>(null)
  const rpcUrl = process.env.NEXT_PUBLIC_OASIS_RPC_URL;

  const handleVote = async () => {
    if (selectedOption === null) return

    setIsVoting(true)
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS!,
        VotingContractAbi.abi,
        signer
      )

      const tx = await contract.vote(selectedOption)
      await tx.wait()

      setVotingResult('Your vote has been recorded!')
    } catch (error) {
      console.error('Voting error:', error)
      setVotingResult('An error occurred while voting. Please try again.')
    }
    setIsVoting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg nouns-border"
    >
      <h2 className="text-4xl font-londrina font-bold mb-8 text-center">Cast Your Vote</h2>
      <div className="space-y-6 mb-8">
        {votingOptions.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full p-4 rounded-lg font-bold nouns-border ${
              selectedOption === option.id
                ? 'bg-nouns-yellow text-nouns-text'
                : 'bg-white text-nouns-text hover:bg-nouns-blue'
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <h3 className="text-2xl font-londrina mb-2">{option.title}</h3>
            <p className="text-lg">{option.description}</p>
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-nouns-green text-nouns-text p-4 rounded-lg font-londrina text-2xl font-bold nouns-border disabled:opacity-50"
        onClick={handleVote}
        disabled={selectedOption === null || isVoting}
      >
        {isVoting ? 'Voting...' : 'Submit Vote'}
      </motion.button>
      {votingResult && (
        <p className="mt-6 text-center font-bold text-xl">{votingResult}</p>
      )}
    </motion.div>
  )
}