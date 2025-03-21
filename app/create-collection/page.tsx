"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CollectionForm } from "@/components/collection-form"
import { useToast } from "@/hooks/use-toast"
import { AnimatedCard } from "@/components/ui/animated-card"

export default function CreateCollectionPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [step, setStep] = useState(1)
  const [formConfig, setFormConfig] = useState({
    name: "",
    description: "",
    symbol: "",
    royaltyBasisPoints: 500, // 5%
    creators: [{ address: "", percentage: 100 }],
    useAIArt: false,
    artDescription: "",
    artStyle: "realistic",
    numberOfItems: 10
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
      if (!formConfig.name || !formConfig.description || !formConfig.symbol) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }
      
      // Check if at least one creator has an address
      if (formConfig.creators.every(c => !c.address)) {
        toast({
          title: "Missing information",
          description: "Please add at least one creator address",
          variant: "destructive",
        })
        return
      }
      
      setStep(2)
    } else if (step === 2) {
      // In a real app, this would submit the collection to the blockchain
      toast({
        title: "Collection created!",
        description: "Your NFT collection has been created successfully",
      })
      
      // Redirect to the marketplace or collection page
      router.push("/marketplace")
    }
  }

  const handleFormUpdate = (updatedConfig: any) => {
    setFormConfig(updatedConfig)
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 gradient-text">Create NFT Collection</h1>
      <p className="text-gray-400 mb-8">
        Create a new NFT collection to showcase your digital assets with SOLarium.
      </p>
      
      {step === 1 && (
        <AnimatedCard>
          <CollectionForm
            config={formConfig}
            onUpdate={handleFormUpdate}
            onBack={handleBack}
            onNext={handleNext}
          />
        </AnimatedCard>
      )}
      
      {step === 2 && (
        <AnimatedCard className="bg-[#161616] border-gray-800 p-6">
          <h2 className="text-2xl font-semibold mb-4">Review & Confirm</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-gray-400 text-sm">Collection Name</h3>
                <p className="text-white">{formConfig.name}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Symbol</h3>
                <p className="text-white">{formConfig.symbol}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Royalty</h3>
                <p className="text-white">{formConfig.royaltyBasisPoints / 100}%</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Number of Items</h3>
                <p className="text-white">{formConfig.numberOfItems}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-400 text-sm">Description</h3>
              <p className="text-white">{formConfig.description}</p>
            </div>
            
            <div>
              <h3 className="text-gray-400 text-sm">Creators</h3>
              <ul className="space-y-2">
                {formConfig.creators.map((creator, index) => (
                  <li key={index} className="text-white">
                    {creator.address} ({creator.percentage}%)
                  </li>
                ))}
              </ul>
            </div>
            
            {formConfig.useAIArt && (
              <>
                <div>
                  <h3 className="text-gray-400 text-sm">AI Art Description</h3>
                  <p className="text-white">{formConfig.artDescription}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Art Style</h3>
                  <p className="text-white">{formConfig.artStyle}</p>
                </div>
              </>
            )}
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack} className="border-gray-800">
              Back
            </Button>
            <Button 
              className="gradient-button"
              onClick={handleNext}
            >
              Create Collection
            </Button>
          </div>
        </AnimatedCard>
      )}
    </div>
  )
}
