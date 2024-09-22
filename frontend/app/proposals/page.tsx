'use client'

import { useState, useEffect } from 'react'
import { Eip1193Provider, ethers } from 'ethers'
import { NounImage } from '@/components/NounImage'
import { VotingContractAbi } from '@/abi/VotingContract'

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

function ProposalsList() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [selectedProposalId, setSelectedProposalId] = useState<number | null>(null)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
  const [isVoting, setIsVoting] = useState(false)
  const [votingResult, setVotingResult] = useState<string | null>(null)

  useEffect(() => {
    fetchProposals()
  }, [])

  const fetchProposals = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_OASIS_RPC_URL)
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_OASIS_VOTING_CONTRACT_ADDRESS!,
        VotingContractAbi.abi,
        provider
      )
      const proposalCount = await contract.proposalCount()
      const proposalsData: Proposal[] = []
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
    }
  }

  const handleVote = async () => {
    if (selectedProposalId === null || selectedOptionIndex === null) return

    setIsVoting(true)
    setVotingResult(null)
    try {
      const { ethereum } = window as Window as { ethereum?: Eip1193Provider }
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
      await fetchProposals() // Refresh proposals to update vote counts
    } catch (error) {
      console.error('Voting error:', error)
      setVotingResult('An error occurred while voting. Please try again.')
    }
    setIsVoting(false)
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      {proposals.map((proposal) => (
        <div key={proposal.proposalId} className="bg-white p-8 rounded-lg nouns-border">
          <h2 className="text-4xl font-londrina font-bold mb-4 text-center">{proposal.title}</h2>
          <p className="mb-4">{proposal.description}</p>
          <NounImage
            nounSeed={proposal.nounSeed}
            width={128}
            height={128}
          />
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
      ))}
    </div>
  )
}

export default ProposalsList;