"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { Loader2, Upload } from 'lucide-react'

interface Message {
  role: 'user' | 'agent'
  content: string
}

interface AgentChatProps {
  agentName: string
  agentImage: string
  onComplete: (collectionDetails: any) => void
}

export function AgentChat({ agentName, agentImage, onComplete }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState('name')
  const [collectionDetails, setCollectionDetails] = useState({
    name: '',
    description: '',
    symbol: '',
    walletAddress: '',
    artGeneration: '',
    artDescription: '',
    artStyle: '',
    uploadedImages: [] as File[],
  })
  const chatEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    // Initial message from the agent
    handleAgentResponse("Hi there! I'm your AI assistant for creating your NFT collection. Let's get started! What would you like to name your collection?")
  }, [])

  const handleAgentResponse = (content: string) => {
    setMessages(prev => [...prev, { role: 'agent', content }])
  }

  const handleUserInput = async (content: string) => {
    setMessages(prev => [...prev, { role: 'user', content }])
    setIsLoading(true)

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    switch (currentStep) {
      case 'name':
        setCollectionDetails(prev => ({ ...prev, name: content }))
        setCurrentStep('description')
        handleAgentResponse(`Great name! Now, can you provide a brief description of your "${content}" collection?`)
        break
      case 'description':
        setCollectionDetails(prev => ({ ...prev, description: content }))
        setCurrentStep('symbol')
        handleAgentResponse("Excellent! What symbol would you like to use for your collection? This is typically a short abbreviation.")
        break
      case 'symbol':
        setCollectionDetails(prev => ({ ...prev, symbol: content }))
        setCurrentStep('walletAddress')
        handleAgentResponse("Perfect! Now, please provide your wallet address where you'd like to receive your NFTs and royalties.")
        break
      case 'walletAddress':
        setCollectionDetails(prev => ({ ...prev, walletAddress: content }))
        setCurrentStep('artGeneration')
        handleAgentResponse("Great! Now, let's talk about the art for your NFTs. Would you like to use DALL-E to generate the art, or would you prefer to upload your own images?")
        break
      case 'artGeneration':
        if (content.toLowerCase().includes('dall-e') || content.toLowerCase().includes('generate')) {
          setCollectionDetails(prev => ({ ...prev, artGeneration: 'dall-e' }))
          setCurrentStep('artDescription')
          handleAgentResponse("Excellent choice! Can you describe the kind of artwork you'd like DALL-E to generate for your collection?")
        } else if (content.toLowerCase().includes('upload') || content.toLowerCase().includes('own')) {
          setCollectionDetails(prev => ({ ...prev, artGeneration: 'upload' }))
          setCurrentStep('uploadImages')
          handleAgentResponse("Great! You can now upload your images. How many images would you like to upload for your collection?")
        } else {
          handleAgentResponse("I'm sorry, I didn't quite understand. Could you please specify if you want to use DALL-E for generation or if you want to upload your own images?")
        }
        break
      case 'artDescription':
        setCollectionDetails(prev => ({ ...prev, artDescription: content }))
        setCurrentStep('artStyle')
        handleAgentResponse("Wonderful description! Lastly, what style of art would you prefer? (e.g., realistic, abstract, cartoon, pixel art)")
        break
      case 'artStyle':
        setCollectionDetails(prev => ({ ...prev, artStyle: content }))
        setCurrentStep('generateImages')
        handleAgentResponse("Perfect! I'll now use DALL-E to generate some sample images based on your description and style. This might take a moment...")
        // Simulate image generation
        setTimeout(() => {
          handleAgentResponse("I've generated some sample images for your collection. Would you like to proceed to the review stage?")
        }, 3000)
        break
      case 'uploadImages':
        const imageCount = parseInt(content)
        if (isNaN(imageCount) || imageCount <= 0) {
          handleAgentResponse("I'm sorry, that doesn't seem to be a valid number. Please enter how many images you'd like to upload.")
        } else {
          setCurrentStep('uploading')
          handleAgentResponse(`Great! Please upload ${imageCount} image${imageCount > 1 ? 's' : ''} for your collection.`)
        }
        break
      case 'complete':
        if (content.toLowerCase().includes('yes')) {
          onComplete(collectionDetails)
        } else {
          handleAgentResponse("No problem! Let me know if you want to make any changes or if you're ready to proceed.")
        }
        break
      default:
        handleAgentResponse("I'm ready to help you with the next step. What would you like to do?")
    }

    setIsLoading(false)
  }

  const handleSend = async () => {
    if (input.trim() === '') return
    await handleUserInput(input)
    setInput('')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newUploadedImages = [...collectionDetails.uploadedImages, ...Array.from(files)]
      setCollectionDetails(prev => ({ ...prev, uploadedImages: newUploadedImages }))
      handleAgentResponse(`Great! You've uploaded ${newUploadedImages.length} image${newUploadedImages.length > 1 ? 's' : ''}. Are you ready to proceed to the review stage?`)
      setCurrentStep('complete')
    }
  }

  return (
    <div className="flex gap-6 h-[600px] max-w-4xl mx-auto">
      <div className="w-1/4">
        <div className="relative w-full aspect-square mb-4">
          <Image
            src={agentImage}
            alt={agentName}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h2 className="text-xl font-bold text-center">{agentName}</h2>
      </div>
      <div className="flex flex-col w-3/4">
        <div className="flex-grow mb-4 p-4 border border-gray-700 rounded-lg overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'agent' ? 'text-left' : 'text-right'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.role === 'agent' ? 'bg-gray-700' : 'bg-blue-600'}`}>
                {message.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {currentStep === 'uploading' ? (
          <div className="flex gap-2">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()} className="gradient-button flex-grow">
              <Upload className="w-4 h-4 mr-2" />
              Upload Images
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button onClick={handleSend} className="gradient-button" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
