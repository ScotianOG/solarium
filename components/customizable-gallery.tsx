"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Settings, Eye, EyeOff } from 'lucide-react'

const nfts = [
  { id: 1, name: "Cosmic Horizon #1", image: "/placeholder.svg?height=300&width=300", collection: "Cosmic Horizons", price: 2.5 },
  { id: 2, name: "Digital Dreams #42", image: "/placeholder.svg?height=300&width=300", collection: "Digital Dreamscapes", price: 1.8 },
  { id: 3, name: "Neon Nights #7", image: "/placeholder.svg?height=300&width=300", collection: "Neon Nightlife", price: 3.2 },
  { id: 4, name: "Abstract Realms #15", image: "/placeholder.svg?height=300&width=300", collection: "Abstract Realities", price: 2.0 },
  { id: 5, name: "Quantum Quill #3", image: "/placeholder.svg?height=300&width=300", collection: "Quantum Quills", price: 4.5 },
  { id: 6, name: "Ethereal Echoes #9", image: "/placeholder.svg?height=300&width=300", collection: "Ethereal Soundscapes", price: 3.7 },
]

export function CustomizableGallery() {
  const [layout, setLayout] = useState("grid")
  const [sortBy, setSortBy] = useState("name")
  const [showPrivate, setShowPrivate] = useState(false)
  const [isCustomizing, setIsCustomizing] = useState(false)

  const sortedNFTs = [...nfts].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "price") return b.price - a.price
    return 0
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gradient-text">Your NFT Gallery</h2>
        <Button 
          variant="outline" 
          className="border-gray-800"
          onClick={() => setIsCustomizing(!isCustomizing)}
        >
          <Settings className="w-4 h-4 mr-2" />
          Customize
        </Button>
      </div>

      {isCustomizing && (
        <Card className="bg-[#161616] border-gray-800">
          <CardHeader>
            <CardTitle>Gallery Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="layout">Layout</Label>
              <Select value={layout} onValueChange={setLayout}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sort">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select sorting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="private">Show Private NFTs</Label>
              <Switch
                id="private"
                checked={showPrivate}
                onCheckedChange={setShowPrivate}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div className={layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {sortedNFTs.map((nft) => (
          <Card key={nft.id} className={`bg-[#161616] border-gray-800 ${layout === "list" ? "flex" : ""}`}>
            <div className={layout === "list" ? "w-1/3" : ""}>
              <Image
                src={nft.image}
                alt={nft.name}
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-t-lg"
              />
            </div>
            <div className={layout === "list" ? "w-2/3" : ""}>
              <CardHeader>
                <CardTitle>{nft.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{nft.collection}</p>
                <p className="text-lg font-bold gradient-text">{nft.price} SOL</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="border-gray-800">
                  View Details
                </Button>
                <Button variant="outline" className="border-gray-800">
                  {showPrivate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

