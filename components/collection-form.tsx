"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from 'lucide-react'
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface CollectionFormProps {
  config: {
    name: string
    description: string
    symbol: string
    royaltyBasisPoints: number
    creators: Array<{ address: string; percentage: number }>
    useAIArt: boolean
    artDescription: string
    artStyle: string
    numberOfItems: number
  }
  onUpdate: (config: any) => void
  onBack: () => void
  onNext: () => void
}

export function CollectionForm({ config, onUpdate, onBack, onNext }: CollectionFormProps) {
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showCreditPurchase, setShowCreditPurchase] = useState(false)

  const addCreator = () => {
    onUpdate({
      ...config,
      creators: [...config.creators, { address: "", percentage: 0 }],
    })
  }

  const removeCreator = (index: number) => {
    const newCreators = config.creators.filter((_, i) => i !== index)
    onUpdate({ ...config, creators: newCreators })
  }

  const updateCreator = (index: number, field: string, value: string | number) => {
    const newCreators = config.creators.map((creator, i) => {
      if (i === index) {
        return { ...creator, [field]: value }
      }
      return creator
    })
    onUpdate({ ...config, creators: newCreators })
  }

  const handleAIArtToggle = (checked: boolean) => {
    onUpdate({ ...config, useAIArt: checked })
  }

  const generateArtPreview = async () => {
    setIsGeneratingPreview(true)
    setPreviewImage(null)
    try {
      const response = await fetch('/api/generate-art', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: config.artDescription,
          style: config.artStyle,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.error === 'Insufficient credits') {
          setShowCreditPurchase(true)
          return
        }
        throw new Error(errorData.error || 'Failed to generate art')
      }

      const data = await response.json()
      if (!data.imageUrl) {
        throw new Error('No image URL received from the server')
      }
      setPreviewImage(data.imageUrl)
    } catch (error) {
      console.error('Error generating art preview:', error)
      alert(`Error generating art preview: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsGeneratingPreview(false)
    }
  }

  const handleCreditPurchase = async () => {
    // Implement credit purchase logic here
    // This could involve calling a payment API, updating user's credit balance, etc.
    alert('Credits purchased successfully!') // Placeholder
    setShowCreditPurchase(false)
    // After successful purchase, you might want to retry generating the art
    await generateArtPreview()
  }

  return (
    <Card className="bg-[#161616] border-gray-800">
      <CardHeader>
        <CardTitle>Collection Details</CardTitle>
        <CardDescription>
          Configure your NFT collection settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="collection-name">Collection Name</Label>
          <Input
            id="collection-name"
            placeholder="Enter collection name"
            value={config.name}
            onChange={(e) => onUpdate({ ...config, name: e.target.value })}
            className="bg-[#121212] border-gray-800"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="collection-description">Description</Label>
          <Textarea
            id="collection-description"
            placeholder="Describe your collection"
            value={config.description}
            onChange={(e) => onUpdate({ ...config, description: e.target.value })}
            className="bg-[#121212] border-gray-800"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="collection-symbol">Symbol</Label>
          <Input
            id="collection-symbol"
            placeholder="Enter collection symbol"
            value={config.symbol}
            onChange={(e) => onUpdate({ ...config, symbol: e.target.value })}
            className="bg-[#121212] border-gray-800"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="royalty">Royalty (%)</Label>
          <Input
            id="royalty"
            type="number"
            min="0"
            max="100"
            value={config.royaltyBasisPoints / 100}
            onChange={(e) => onUpdate({ ...config, royaltyBasisPoints: Number(e.target.value) * 100 })}
            className="bg-[#121212] border-gray-800"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Creators</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={addCreator}
              className="border-gray-800"
            >
              Add Creator
            </Button>
          </div>
          {config.creators.map((creator, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Creator address"
                  value={creator.address}
                  onChange={(e) => updateCreator(index, "address", e.target.value)}
                  className="bg-[#121212] border-gray-800"
                />
              </div>
              <div className="w-32">
                <Input
                  type="number"
                  placeholder="Share %"
                  value={creator.percentage}
                  onChange={(e) => updateCreator(index, "percentage", Number(e.target.value))}
                  className="bg-[#121212] border-gray-800"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeCreator(index)}
                className="border-gray-800"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="use-ai-art">Use AI-generated Art</Label>
            <Switch
              id="use-ai-art"
              checked={config.useAIArt}
              onCheckedChange={handleAIArtToggle}
            />
          </div>
          {config.useAIArt && (
            <>
              <div className="space-y-2">
                <Label htmlFor="art-description">Art Description</Label>
                <Textarea
                  id="art-description"
                  placeholder="Describe the art you want to generate"
                  value={config.artDescription}
                  onChange={(e) => onUpdate({ ...config, artDescription: e.target.value })}
                  className="bg-[#121212] border-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="art-style">Art Style</Label>
                <Select
                  value={config.artStyle}
                  onValueChange={(value) => onUpdate({ ...config, artStyle: value })}
                >
                  <SelectTrigger className="bg-[#121212] border-gray-800">
                    <SelectValue placeholder="Select art style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="abstract">Abstract</SelectItem>
                    <SelectItem value="cartoon">Cartoon</SelectItem>
                    <SelectItem value="pixel">Pixel Art</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Number of Items</Label>
                <Slider
                  min={1}
                  max={100}
                  step={1}
                  value={[config.numberOfItems]}
                  onValueChange={([value]) => onUpdate({ ...config, numberOfItems: value })}
                />
                <div className="text-right text-sm text-gray-400">{config.numberOfItems} items</div>
              </div>
              <Button
                onClick={generateArtPreview}
                disabled={isGeneratingPreview || !config.artDescription || !config.artStyle}
                className={`w-full ${isGeneratingPreview ? 'bg-yellow-600' : 'gradient-button'}`}
              >
                {isGeneratingPreview ? "Generating Preview..." : "Generate Art Preview"}
              </Button>
              {previewImage && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Preview</h3>
                  <div className="relative aspect-square w-full max-w-md mx-auto">
                    <Image
                      src={previewImage}
                      alt="AI-generated art preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="border-gray-800">
            Back
          </Button>
          <Button 
            className="gradient-button"
            onClick={onNext}
            disabled={!config.name || !config.description || !config.symbol || config.creators.some(c => !c.address)}
          >
            Continue
          </Button>
        </div>
        <Dialog open={showCreditPurchase} onOpenChange={setShowCreditPurchase}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase Credits</DialogTitle>
              <DialogDescription>
                You need to purchase credits to generate AI art. Would you like to buy credits now?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreditPurchase(false)}>Cancel</Button>
              <Button onClick={handleCreditPurchase}>Purchase Credits</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
