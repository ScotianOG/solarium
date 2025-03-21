"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { Flame, Info, Loader2 } from "lucide-react"

// Mock data for NFTs the user has minted
// In a real application, this would come from an API call
const userMintedNfts = [
  {
    id: "nft-001",
    name: "Cosmic Explorer #42",
    collection: "Cosmic Explorers",
    image: "/placeholder.svg",
    floorPrice: 120,
    mintDate: "2024-12-10"
  },
  {
    id: "nft-002",
    name: "Digital Nomad #13",
    collection: "Digital Nomads",
    image: "/placeholder.svg",
    floorPrice: 85,
    mintDate: "2024-11-28"
  },
  {
    id: "nft-003",
    name: "Quantum Realm #7",
    collection: "Quantum Beings",
    image: "/placeholder.svg",
    floorPrice: 165,
    mintDate: "2025-01-15"
  },
  {
    id: "nft-004",
    name: "Neo Tokyo #29",
    collection: "Neo Tokyo",
    image: "/placeholder.svg",
    floorPrice: 110,
    mintDate: "2025-02-02"
  },
  {
    id: "nft-005",
    name: "Cyber Punk #51",
    collection: "Cyber Punks",
    image: "/placeholder.svg",
    floorPrice: 95,
    mintDate: "2025-01-05"
  },
  {
    id: "nft-006",
    name: "Space Voyager #8",
    collection: "Space Voyagers",
    image: "/placeholder.svg",
    floorPrice: 140,
    mintDate: "2025-02-20"
  }
]

export function MyVaultNFTs() {
  const [nfts, setNfts] = useState(userMintedNfts)
  const [isLoading, setIsLoading] = useState<string | null>(null)

  // Function to handle the trade-back (burn) NFT process
  const handleTradeBack = async (nftId: string) => {
    setIsLoading(nftId)
    
    try {
      // Simulate API call to burn the NFT and receive SOUL tokens
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Remove the NFT from the list (simulating successful burn)
      setNfts(prevNfts => prevNfts.filter(nft => nft.id !== nftId))
      
      // In a real application, you would also update the user's SOUL balance
      // and potentially show a success notification
    } catch (error) {
      console.error("Failed to trade back NFT:", error)
      // Handle error case, show error notification, etc.
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gradient-text">Your Minted NFTs</h2>
        <div className="flex items-center text-gray-400 text-sm">
          <Info className="h-4 w-4 mr-2" />
          <span>Trade back NFTs for SOUL tokens at floor price</span>
        </div>
      </div>

      {nfts.length === 0 ? (
        <div className="text-center py-12 bg-gray-900/50 rounded-lg border border-gray-800">
          <div className="mx-auto w-16 h-16 mb-4 text-gray-500">
            <Flame className="w-full h-full" />
          </div>
          <h3 className="text-xl font-medium mb-2">No Minted NFTs</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            You haven't minted any NFTs yet or all your NFTs have been traded back for SOUL tokens.
          </p>
          <Button className="mt-6 gradient-button">Browse Marketplace</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <Card key={nft.id} className="bg-gray-900 border-gray-800 overflow-hidden">
              <CardContent className="p-4">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="font-medium truncate">{nft.name}</h3>
                <p className="text-sm text-gray-400 truncate">{nft.collection}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex flex-col gap-3">
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm text-gray-400">Floor Price</span>
                  <span className="font-medium gradient-text">{nft.floorPrice} SOUL</span>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10 text-purple-400"
                    >
                      <Flame className="h-4 w-4 mr-2" />
                      Trade Back
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle>Trade Back NFT for SOUL</DialogTitle>
                      <DialogDescription>
                        You are about to trade back your NFT for SOUL tokens. This action will burn your NFT and credit your account with the floor price in SOUL tokens. This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex items-center space-x-4 py-4">
                      <div className="h-20 w-20 relative rounded overflow-hidden">
                        <Image
                          src={nft.image}
                          alt={nft.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{nft.name}</h4>
                        <p className="text-sm text-gray-400">{nft.collection}</p>
                        <p className="text-sm mt-1">
                          <span className="text-gray-400">You will receive: </span>
                          <span className="font-medium gradient-text">{nft.floorPrice} SOUL</span>
                        </p>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        variant="ghost" 
                        onClick={() => {}}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="gradient-button"
                        disabled={isLoading === nft.id}
                        onClick={() => handleTradeBack(nft.id)}
                      >
                        {isLoading === nft.id ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Flame className="h-4 w-4 mr-2" />
                            Confirm Trade Back
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
