"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle, AlertCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AgentConfigProps {
  config: {
    name: string
    publicKey: string
  }
  onUpdate: (config: any) => void
  onNext: () => void
}

export function AgentConfig({ config, onUpdate, onNext }: AgentConfigProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateKeypair = async () => {
    setIsGenerating(true)
    setError(null)
    try {
      const response = await fetch('/api/generate-keypair', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Failed to generate keypair')
      }
      const { publicKey } = await response.json()
      onUpdate({ ...config, publicKey })
    } catch (error) {
      console.error('Failed to generate keypair:', error)
      setError('Failed to generate keypair. Please try again or enter your wallet address manually.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="bg-[#161616] border-gray-800">
      <CardHeader>
        <CardTitle>Configure Your Agent</CardTitle>
        <CardDescription>
          Set up an agent to help you deploy and manage your NFT collection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="agent-name">Agent Name</Label>
          <Input
            id="agent-name"
            placeholder="Enter a name for your agent"
            value={config.name}
            onChange={(e) => onUpdate({ ...config, name: e.target.value })}
            className="bg-[#121212] border-gray-800"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label>Wallet Address</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>This is your public key on the Solana blockchain. You can paste an existing address or generate a new one.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={generateKeypair}
              disabled={isGenerating}
              className="border-gray-800"
            >
              {isGenerating ? "Generating..." : "Generate New"}
            </Button>
          </div>
          <Input
            value={config.publicKey}
            onChange={(e) => onUpdate({ ...config, publicKey: e.target.value })}
            placeholder="Paste your wallet address or generate a new one"
            className="bg-[#121212] border-gray-800"
          />
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="bg-[#1E1E1E] border border-gray-800 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white">Using Your Wallet Address</h3>
          <p className="text-sm text-gray-400">
            You have two options for providing a wallet address:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
            <li>Paste an existing Solana wallet address if you already have one.</li>
            <li>Generate a new wallet address using the "Generate New" button. This creates a new Solana account managed by our platform.</li>
          </ul>
          <p className="text-sm text-gray-400">
            Your wallet address is used to:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
            <li>Identify your agent on the blockchain</li>
            <li>Receive and manage your NFT collections</li>
            <li>Interact with other Solana applications</li>
          </ul>
          <p className="text-sm text-gray-400">
            The wallet address is public and safe to share. If you generate a new address, the associated private key is securely managed by our platform.
          </p>
        </div>
        <Button 
          className="w-full gradient-button"
          onClick={onNext}
          disabled={!config.name || !config.publicKey}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  )
}
