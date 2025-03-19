"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import { CollectionPage } from "@/components/collection-page"
import Image from "next/image"

interface DeploymentReviewProps {
  collectionConfig: {
    name: string
    description: string
    symbol: string
    walletAddress: string
    artGeneration: string
    artDescription: string
    artStyle: string
    uploadedImages: File[]
  }
  onBack: () => void
}

export function DeploymentReview({ collectionConfig, onBack }: DeploymentReviewProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [error, setError] = useState("")
  const [deployedCollection, setDeployedCollection] = useState<null | {
    name: string
    description: string
    items: Array<{ id: number; name: string; image: string }>
  }>(null)

  const handleDeploy = async () => {
    setIsDeploying(true)
    setError("")

    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 3000))

      let generatedItems;

      if (collectionConfig.artGeneration === 'dall-e') {
        // Simulate DALL-E image generation
        generatedItems = Array.from({ length: 10 }, (_, index) => ({
          id: index + 1,
          name: `${collectionConfig.name} #${index + 1}`,
          image: `/placeholder.svg?height=300&width=300&text=AI Generated ${index + 1}`,
        }))
      } else {
        // Use uploaded images
        generatedItems = collectionConfig.uploadedImages.map((file, index) => ({
          id: index + 1,
          name: `${collectionConfig.name} #${index + 1}`,
          image: URL.createObjectURL(file),
        }))
      }

      setDeployedCollection({
        name: collectionConfig.name,
        description: collectionConfig.description,
        items: generatedItems,
      })

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to deploy collection")
    } finally {
      setIsDeploying(false)
    }
  }

  if (deployedCollection) {
    return <CollectionPage {...deployedCollection} />
  }

  return (
    <Card className="bg-[#161616] border-gray-800">
      <CardHeader>
        <CardTitle>Review & Deploy</CardTitle>
        <CardDescription>
          Review your collection details before deployment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Collection Name</h3>
            <p className="mt-1">{collectionConfig.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Description</h3>
            <p className="mt-1">{collectionConfig.description}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Symbol</h3>
            <p className="mt-1">{collectionConfig.symbol}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Wallet Address</h3>
            <p className="mt-1">{collectionConfig.walletAddress}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Art Generation Method</h3>
            <p className="mt-1">{collectionConfig.artGeneration === 'dall-e' ? 'DALL-E AI Generation' : 'User Upload'}</p>
          </div>
          {collectionConfig.artGeneration === 'dall-e' && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Art Description</h3>
                <p className="mt-1">{collectionConfig.artDescription}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Art Style</h3>
                <p className="mt-1">{collectionConfig.artStyle}</p>
              </div>
            </>
          )}
          {collectionConfig.artGeneration === 'upload' && (
            <div>
              <h3 className="text-sm font-medium text-gray-400">Uploaded Images</h3>
              <p className="mt-1">{collectionConfig.uploadedImages.length} images uploaded</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {collectionConfig.uploadedImages.slice(0, 6).map((file, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                ))}
              </div>
              {collectionConfig.uploadedImages.length > 6 && (
                <p className="mt-2 text-sm text-gray-400">
                  +{collectionConfig.uploadedImages.length - 6} more images
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="border-gray-800">
            Back
          </Button>
          <Button 
            className="gradient-button"
            onClick={handleDeploy}
            disabled={isDeploying}
          >
            {isDeploying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deploying...
              </>
            ) : (
              "Deploy Collection"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
