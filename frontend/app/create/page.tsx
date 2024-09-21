'use client'

import { useState } from 'react'
import { Eip1193Provider, ethers } from 'ethers'
import { VotingContractAbi } from '@/abi/VotingContract'
import { useRouter } from 'next/navigation'

interface Window {
    ethereum?: Eip1193Provider;
}

export function CreateProposal() {
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    options: [''],
    nounSeed: ''
  })
  const [creatingProposal, setCreatingProposal] = useState(false)
  const [votingResult, setVotingResult] = useState<string | null>(null)
  const router = useRouter()
  const { ethereum } = window as Window;

  const handleCreateProposal = async () => {
    const { title, description, options, nounSeed } = newProposal
    if (
      !title ||
      !description ||
      options.length < 2 ||
      !nounSeed ||
      options.some((opt) => !opt.trim())
    ) {
      setVotingResult('Please fill in all fields and ensure at least two options.')
      return
    }

    setCreatingProposal(true)
    try {
      if (!ethereum) {
        throw new Error('Ethereum provider not found')
      }
      const provider = new ethers.BrowserProvider(ethereum);
      await provider.send('eth_requestAccounts', [])
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_OASIS_VOTING_CONTRACT_ADDRESS!,
        VotingContractAbi.abi,
        signer
      )

      const tx = await contract.createProposal(title, description, nounSeed, options)
      await tx.wait()

      setVotingResult('Proposal created successfully!')
      setNewProposal({ title: '', description: '', options: [''], nounSeed: '' })

      // Redirect to proposals page
      router.push('/proposals')
    } catch (error) {
      console.error('Error creating proposal:', error)
      setVotingResult('An error occurred while creating the proposal. Please try again.')
    }
    setCreatingProposal(false)
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-4xl font-londrina font-bold mb-8 text-center">Create a Proposal</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Proposal Title"
          value={newProposal.title}
          onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Proposal Description"
          value={newProposal.description}
          onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Noun Seed"
          value={newProposal.nounSeed}
          onChange={(e) => setNewProposal({ ...newProposal, nounSeed: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {newProposal.options.map((option, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={option}
            onChange={(e) => {
              const options = [...newProposal.options]
              options[idx] = e.target.value
              setNewProposal({ ...newProposal, options })
            }}
            className="w-full p-2 border rounded"
          />
        ))}
        <button
          onClick={() => setNewProposal({ ...newProposal, options: [...newProposal.options, ''] })}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Option
        </button>
        <button
          onClick={handleCreateProposal}
          className="w-full bg-nouns-green text-nouns-text p-4 rounded-lg font-londrina text-2xl font-bold nouns-border"
          disabled={creatingProposal}
        >
          {creatingProposal ? 'Creating Proposal...' : 'Submit Proposal'}
        </button>
        {votingResult && (
          <p className="mt-6 text-center font-bold text-xl text-red-500">{votingResult}</p>
        )}
      </div>
    </div>
  )
}

export default CreateProposal