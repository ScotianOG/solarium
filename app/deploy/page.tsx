"use client"

import { useState, useEffect } from "react"
import { AgentSelection } from "@/components/agent-selection"
import { AgentChat } from "@/components/agent-chat"
import { DeploymentReview } from "@/components/deployment-review"

export default function DeployPage() {
  const [step, setStep] = useState('select-agent')
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [collectionDetails, setCollectionDetails] = useState<any>(null)

  const handleAgentSelect = (agent: any) => {
    setSelectedAgent(agent)
    setStep('chat')
  }

  const handleChatComplete = (details: any) => {
    setCollectionDetails(details)
    setStep('review')
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold gradient-text mb-8">Deploy Your NFT Collection</h1>
        {step === 'select-agent' && (
          <AgentSelection onSelect={handleAgentSelect} />
        )}
        {step === 'chat' && selectedAgent && (
          <AgentChat
            agentName={selectedAgent.name}
            agentImage={selectedAgent.image}
            onComplete={handleChatComplete}
          />
        )}
        {step === 'review' && collectionDetails && (
          <DeploymentReview
            collectionConfig={collectionDetails}
            onBack={() => setStep('chat')}
          />
        )}
      </div>
    </div>
  )
}

