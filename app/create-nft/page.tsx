"use client"

import { useState } from "react"
import { NFTForm } from "@/components/nft-form"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Button } from "@/components/ui/button"

export default function CreateNFTPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  // For demo purposes, hardcoded collections
  const mockCollections = [
    { id: "1", name: "Crypto Punks" },
    { id: "2", name: "Bored Ape Yacht Club" },
    { id: "3", name: "SOL Mates" },
    { id: "4", name: "Solana Monkeys" },
    { id: "5", name: "My Collection" }
  ]
  
  const [step, setStep] = useState(1)
  const [nftConfig, setNftConfig] = useState({
    name: "",
    description: "",
    collection: "",
    attributes: [{ trait_type: "", value: "" }],
    royaltyPercent: 5,
    file: null as File | null,
    previewUrl: null as string | null,
    generateWithAI: false,
    aiPrompt: ""
  })

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      // Confirm before navigating away
      if (window.confirm("Are you sure you want to cancel? Your progress will be lost.")) {
        router.push("/marketplace")
      }
    }
  }

  const handleNext = () => {
    if (step === 1) {
      // Validation for step 1
      if (!nftConfig.name || !nftConfig.description || !nftConfig.collection) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }
      
      if (!nftConfig.file && !nftConfig.previewUrl && !nftConfig.generateWithAI) {
        toast({
          title: "Missing media",
          description: "Please upload an image or use AI generation",
          variant: "destructive",
        })
        return
      }
      
      setStep(2)
    } else if (step === 2) {
      // In a real app, this would mint the NFT on the blockchain
      toast({
        title: "NFT created!",
        description: "Your NFT has been created successfully",
      })
      
      // Redirect to the marketplace or profile page
      router.push("/marketplace")
    }
  }

  const handleNFTFormUpdate = (updatedConfig: any) => {
    setNftConfig(updatedConfig)
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 gradient-text">Create NFT</h1>
      <p className="text-gray-400 mb-8">
        Create a new NFT to showcase in your collection or sell on the marketplace.
      </p>
      
      {/* Progress indicators */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? "bg-cyan-500" : "bg-gray-700"
          }`}>
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? "bg-cyan-500" : "bg-gray-700"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? "bg-cyan-500" : "bg-gray-700"
          }`}>
            2
          </div>
        </div>
      </div>
      
      {step === 1 && (
        <AnimatedCard>
          <NFTForm
            config={nftConfig}
            onUpdate={handleNFTFormUpdate}
            onBack={handleBack}
            onNext={handleNext}
            collections={mockCollections}
          />
        </AnimatedCard>
      )}
      
      {step === 2 && (
        <AnimatedCard className="bg-[#161616] border-gray-800 p-6">
          <h2 className="text-2xl font-semibold mb-4">Review & Mint</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-400 text-sm">Preview</h3>
                <div className="aspect-square w-full bg-gray-900 rounded-lg overflow-hidden mt-2">
                  {nftConfig.previewUrl ? (
                    <img
                      src={nftConfig.previewUrl}
                      alt="NFT preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">No preview available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-400 text-sm">Name</h3>
                <p className="text-white">{nftConfig.name}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Description</h3>
                <p className="text-white">{nftConfig.description}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Collection</h3>
                <p className="text-white">
                  {mockCollections.find(c => c.id === nftConfig.collection)?.name || "Unknown"}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Royalty</h3>
                <p className="text-white">{nftConfig.royaltyPercent}%</p>
              </div>
              
              {nftConfig.attributes.length > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm">Attributes</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {nftConfig.attributes.map((attr, index) => (
                      attr.trait_type && attr.value ? (
                        <div key={index} className="bg-gray-800 rounded-md p-2">
                          <p className="text-gray-400 text-xs">{attr.trait_type}</p>
                          <p className="text-white text-sm">{attr.value}</p>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}
              
              {nftConfig.generateWithAI && (
                <div>
                  <h3 className="text-gray-400 text-sm">AI Prompt</h3>
                  <p className="text-white">{nftConfig.aiPrompt}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack} className="border-gray-800">
              Back
            </Button>
            <Button 
              className="gradient-button"
              onClick={handleNext}
            >
              Mint NFT
            </Button>
          </div>
        </AnimatedCard>
      )}
    </div>
  )
}
