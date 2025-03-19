"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Agent {
  id: number
  name: string
  image: string
}

const agents: Agent[] = [
  { id: 1, name: "Crypto Carl", image: "/agents/crypto-carl.png" },
  { id: 2, name: "Blockchain Betty", image: "/agents/blockchain-betty.png" },
  { id: 3, name: "NFT Nick", image: "/agents/nft-nick.png" },
  { id: 4, name: "Token Tina", image: "/agents/token-tina.png" },
  { id: 5, name: "Smart Contract Sam", image: "/agents/smart-contract-sam.png" },
  { id: 6, name: "DeFi Daisy", image: "/agents/defi-daisy.png" },
  { id: 7, name: "Miner Mike", image: "/agents/miner-mike.png" },
  { id: 8, name: "Wallet Wendy", image: "/agents/wallet-wendy.png" },
  { id: 9, name: "Dapp Dave", image: "/agents/dapp-dave.png" },
  { id: 10, name: "Airdrop Amy", image: "/agents/airdrop-amy.png" },
  { id: 11, name: "Governance Gary", image: "/agents/governance-gary.png" },
  { id: 12, name: "Staking Stella", image: "/agents/staking-stella.png" },
]

interface AgentSelectionProps {
  onSelect: (agent: Agent) => void
}

export function AgentSelection({ onSelect }: AgentSelectionProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const handleSelect = (agent: Agent) => {
    setSelectedAgent(agent)
  }

  const handleConfirm = () => {
    if (selectedAgent) {
      onSelect(selectedAgent)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Choose Your AI Agent</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <Card 
            key={agent.id} 
            className={`cursor-pointer transition-all ${
              selectedAgent?.id === agent.id ? 'ring-2 ring-cyan-500' : ''
            }`}
            onClick={() => handleSelect(agent)}
          >
            <CardContent className="p-4 flex flex-col items-center">
              <div className="relative w-24 h-24 mb-2">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <p className="text-center font-medium">{agent.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button 
          onClick={handleConfirm} 
          disabled={!selectedAgent}
          className="gradient-button"
        >
          Confirm Selection
        </Button>
      </div>
    </div>
  )
}
