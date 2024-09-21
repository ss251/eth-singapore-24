'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { VotingContractAbi } from '@/abi/VotingContract'
import { NounImage } from '@/components/NounImage'
import WorldIDWidget from '@/components/WorldIDWidget'
import { useAccount } from 'wagmi'
import { checkWorldIDVerification } from '@/utils/worldID'
import { Eip1193Provider } from 'ethers'

interface Proposal {
  proposalId: number
  title: string
  description: string
  nounSeed: string
  options: string[]
  votes: number[]
}

interface Window {
  ethereum?: Eip1193Provider
}

export function VotingSection() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [selectedProposalId, setSelectedProposalId] = useState<number | null>(null)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
  const [isVoting, setIsVoting] = useState(false)
  const [votingResult, setVotingResult] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const { address } = useAccount()

  useEffect(() => {
    fetchProposals()
  }, [])

  useEffect(() => {
    if (address) {
      checkVerificationStatus()
    }
  }, [address])

  const fetchProposals = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_OASIS_RPC_URL)

      const contractAddress = process.env.NEXT_PUBLIC_OASIS_VOTING_CONTRACT_ADDRESS
      if (!contractAddress) {
        throw new Error('Voting contract address not set. Please deploy the contract and set NEXT_PUBLIC_OASIS_VOTING_CONTRACT_ADDRESS in your .env file.')
      }

      const contract = new ethers.Contract(
        contractAddress,
        VotingContractAbi.abi,
        provider
      )
      const proposalCount = await contract.proposalCount()
      const proposalsData: Proposal[] = []

      if (proposalCount === 0) {
        // No proposals exist
        setProposals([])
        return
      }

      for (let i = 0; i < proposalCount; i++) {
        const [title, description, nounSeed, options, votes] = await contract.getProposal(i)
        proposalsData.push({
          proposalId: i,
          title,
          description,
          nounSeed,
          options,
          votes: votes.map((v: ethers.BigNumberish) => Number(v))
        })
      }
      setProposals(proposalsData)
    } catch (error) {
      console.error('Error fetching proposals:', error)
      // Guide user to create a proposal
      setProposals([])
    }
  }

  const checkVerificationStatus = async () => {
    const verified = await checkWorldIDVerification(address!)
    setIsVerified(verified)
  }

  const handleVerificationSuccess = () => {
    setIsVerified(true)
  }

  const handleVerificationChange = (verified: boolean) => {
    setIsVerified(verified)
  }

  const handleVote = async () => {
    if (selectedProposalId === null || selectedOptionIndex === null) return

    setIsVoting(true)
    setVotingResult(null)
    try {
      const { ethereum } = window as Window
      if (!ethereum) {
        throw new Error('Ethereum provider not found')
      }
      const provider = new ethers.BrowserProvider(ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_OASIS_VOTING_CONTRACT_ADDRESS!,
        VotingContractAbi.abi,
        signer
      )

      const tx = await contract.vote(selectedProposalId, selectedOptionIndex)
      await tx.wait()

      setVotingResult('Your vote has been recorded!')
      setSelectedOptionIndex(null)
      setSelectedProposalId(null)
      await fetchProposals()
    } catch (error) {
      console.error('Voting error:', error)
      setVotingResult('An error occurred while voting. Please try again.')
    }
    setIsVoting(false)
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      {!isVerified ? (
        <div className="flex justify-center">
          <WorldIDWidget
            onSuccess={handleVerificationSuccess}
            onVerificationChange={handleVerificationChange}
          />
        </div>
      ) : (
        <>
          {proposals.length === 0 ? (
            <div className="text-center">
              <p className="text-xl mb-4">No proposals found.</p>
              <a href="/create" className="nouns-button text-xl px-6 py-2">
                Create a Proposal
              </a>
            </div>
          ) : (
            proposals.map((proposal) => (
              <div key={proposal.proposalId} className="bg-white p-8 rounded-lg nouns-border">
                <h2 className="text-4xl font-londrina font-bold mb-4 text-center">
                  {proposal.title}
                </h2>
                <p className="mb-4">{proposal.description}</p>
                <NounImage nounSeed={proposal.nounSeed} width={128} height={128} />
                <div className="space-y-6 mb-8">
                  {proposal.options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full p-4 rounded-lg font-bold nouns-border ${
                        selectedOptionIndex === index && selectedProposalId === proposal.proposalId
                          ? 'bg-nouns-yellow text-nouns-text'
                          : 'bg-white text-nouns-text hover:bg-nouns-blue'
                      }`}
                      onClick={() => {
                        setSelectedProposalId(proposal.proposalId)
                        setSelectedOptionIndex(index)
                      }}
                    >
                      <h3 className="text-2xl font-londrina mb-2">{option}</h3>
                      <p className="text-lg">Votes: {proposal.votes[index]}</p>
                    </button>
                  ))}
                </div>
                <button
                  className="w-full bg-nouns-green text-nouns-text p-4 rounded-lg font-londrina text-2xl font-bold nouns-border disabled:opacity-50"
                  onClick={handleVote}
                  disabled={
                    selectedProposalId !== proposal.proposalId ||
                    selectedOptionIndex === null ||
                    isVoting
                  }
                >
                  {isVoting ? 'Voting...' : 'Submit Vote'}
                </button>
                {votingResult && (
                  <p className="mt-6 text-center font-bold text-xl">{votingResult}</p>
                )}
              </div>
            ))
          )}
        </>
      )}
    </div>
  )
}