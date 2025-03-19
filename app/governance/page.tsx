"use client"

import { useState } from 'react'
import { ProposalList } from "@/components/proposal-list"
import { VotingPower } from "@/components/voting-power"
import { CreateProposal } from "@/components/create-proposal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function GovernancePage() {
  const [showCreateProposal, setShowCreateProposal] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold gradient-text">Governance</h1>
        <Button onClick={() => setShowCreateProposal(true)} className="gradient-button">
          Create Proposal
        </Button>
      </div>
      <div className="space-y-4">
        <p className="text-gray-400 max-w-3xl">
          Participate in shaping the future of SOLarium. Use your voting power to influence key decisions 
          and contribute to the platform's development. Your voice matters in our decentralized ecosystem.
        </p>
      </div>
      <VotingPower />
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Proposals</TabsTrigger>
          <TabsTrigger value="past">Past Proposals</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ProposalList status="active" />
        </TabsContent>
        <TabsContent value="past">
          <ProposalList status="past" />
        </TabsContent>
      </Tabs>
      {showCreateProposal && (
        <CreateProposal onClose={() => setShowCreateProposal(false)} />
      )}
    </div>
  )
}

