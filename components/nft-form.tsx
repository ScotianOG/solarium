"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Trash2, Upload, X, RefreshCw } from 'lucide-react'
import Image from "next/image"

interface NFTFormProps {
  config: {
    name: string
    description: string
    collection: string
    attributes: Array<{ trait_type: string; value: string }>
    royaltyPercent: number
    file: File | null
    previewUrl: string | null
    generateWithAI: boolean
    aiPrompt: string
  }
  onUpdate: (config: any) => void
  onBack: () => void
  onNext: () => void
  collections: { id: string; name: string }[]
}

export function NFTForm({ config, onUpdate, onBack, onNext, collections }: NFTFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    const file = files[0]
    const maxSize = 10 * 1024 * 1024 // 10MB
    
    if (file.size > maxSize) {
      setUploadError("File size exceeds 10MB limit")
      return
    }
    
    setUploadError(null)
    
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file)
    
    onUpdate({
      ...config,
      file,
      previewUrl,
      generateWithAI: false // Turn off AI generation when a file is manually uploaded
    })
  }, [config, onUpdate])

  const removeFile = useCallback(() => {
    if (config.previewUrl) {
      URL.revokeObjectURL(config.previewUrl)
    }
    
    onUpdate({
      ...config,
      file: null,
      previewUrl: null
    })
  }, [config, onUpdate])

  const addAttribute = useCallback(() => {
    onUpdate({
      ...config,
      attributes: [...config.attributes, { trait_type: "", value: "" }]
    })
  }, [config, onUpdate])

  const removeAttribute = useCallback((index: number) => {
    const newAttributes = config.attributes.filter((_, i) => i !== index)
    onUpdate({ ...config, attributes: newAttributes })
  }, [config, onUpdate])

  const updateAttribute = useCallback((index: number, field: string, value: string) => {
    const newAttributes = config.attributes.map((attr, i) => {
      if (i === index) {
        return { ...attr, [field]: value }
      }
      return attr
    })
    onUpdate({ ...config, attributes: newAttributes })
  }, [config, onUpdate])

  const handleGenerateWithAI = useCallback(async () => {
    if (!config.aiPrompt) {
      alert("Please enter an AI generation prompt")
      return
    }
    
    setIsGenerating(true)
    
    try {
      // This would be an actual API call in a production app
      // Simulating a delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo, we'll just use a placeholder image
      onUpdate({
        ...config,
        previewUrl: "/placeholder.jpg",
        file: null,
        generateWithAI: true
      })
    } catch (error) {
      console.error("Error generating image:", error)
      alert("Failed to generate image. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }, [config, onUpdate])

  const handleAIToggle = (checked: boolean) => {
    onUpdate({ 
      ...config, 
      generateWithAI: checked,
      // Clear file upload if switching to AI generation
      ...(checked && config.file ? { file: null, previewUrl: null } : {})
    })
  }

  return (
    <Card className="bg-[#161616] border-gray-800">
      <CardHeader>
        <CardTitle>Create NFT</CardTitle>
        <CardDescription>
          Fill in the details for your new NFT
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nft-name">NFT Name</Label>
          <Input
            id="nft-name"
            placeholder="Enter NFT name"
            value={config.name}
            onChange={(e) => onUpdate({ ...config, name: e.target.value })}
            className="bg-[#121212] border-gray-800"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nft-description">Description</Label>
          <Textarea
            id="nft-description"
            placeholder="Describe your NFT"
            value={config.description}
            onChange={(e) => onUpdate({ ...config, description: e.target.value })}
            className="bg-[#121212] border-gray-800"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nft-collection">Collection</Label>
          <Select
            value={config.collection}
            onValueChange={(value) => onUpdate({ ...config, collection: value })}
          >
            <SelectTrigger className="bg-[#121212] border-gray-800">
              <SelectValue placeholder="Select a collection" />
            </SelectTrigger>
            <SelectContent>
              {collections.map((collection) => (
                <SelectItem key={collection.id} value={collection.id}>
                  {collection.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="royalty">Royalty (%)</Label>
          <Input
            id="royalty"
            type="number"
            min="0"
            max="100"
            value={config.royaltyPercent}
            onChange={(e) => onUpdate({ ...config, royaltyPercent: Number(e.target.value) })}
            className="bg-[#121212] border-gray-800"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="use-ai">Generate with AI</Label>
            <Switch
              id="use-ai"
              checked={config.generateWithAI}
              onCheckedChange={handleAIToggle}
            />
          </div>
          
          {config.generateWithAI ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">AI Prompt</Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="Describe the image you want to generate"
                  value={config.aiPrompt}
                  onChange={(e) => onUpdate({ ...config, aiPrompt: e.target.value })}
                  className="bg-[#121212] border-gray-800"
                />
              </div>
              <Button
                onClick={handleGenerateWithAI}
                disabled={isGenerating || !config.aiPrompt}
                className="w-full flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate Image</>
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-3">
              <Label>Upload File</Label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
                {!config.file && !config.previewUrl ? (
                  <div className="py-8">
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <div className="text-sm text-gray-400 text-center">
                        <div>Drag and drop your file here or</div>
                        <label htmlFor="file-upload" className="cursor-pointer text-cyan-400 hover:text-cyan-300">
                          Browse
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        PNG, JPG, or GIF. Max 10MB.
                      </div>
                      {uploadError && (
                        <div className="text-red-500 text-sm mt-2">
                          {uploadError}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden">
                      <Image
                        src={config.previewUrl || "/placeholder.jpg"}
                        alt="NFT preview"
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Attributes</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={addAttribute}
              className="border-gray-800"
            >
              Add Attribute
            </Button>
          </div>
          {config.attributes.map((attr, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Trait name"
                  value={attr.trait_type}
                  onChange={(e) => updateAttribute(index, "trait_type", e.target.value)}
                  className="bg-[#121212] border-gray-800"
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) => updateAttribute(index, "value", e.target.value)}
                  className="bg-[#121212] border-gray-800"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeAttribute(index)}
                className="border-gray-800"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="border-gray-800">
            Back
          </Button>
          <Button
            className="gradient-button"
            onClick={onNext}
            disabled={
              !config.name ||
              !config.description ||
              !config.collection ||
              (!config.file && !config.previewUrl && !config.generateWithAI)
            }
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
