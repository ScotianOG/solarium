import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Unlock } from 'lucide-react'

interface NFT {
  id: number;
  title: string;
  image: string;
  floorPrice: number;
  locked: boolean;
}

const userNFTs: NFT[] = [
  { id: 1, title: "Cosmic Horizon #1", image: "/placeholder.svg?height=200&width=200", floorPrice: 50, locked: true },
  { id: 2, title: "Digital Dreams #42", image: "/placeholder.svg?height=200&width=200", floorPrice: 75, locked: false },
  { id: 3, title: "Neon Nights #7", image: "/placeholder.svg?height=200&width=200", floorPrice: 60, locked: true },
  { id: 4, title: "Abstract Realms #15", image: "/placeholder.svg?height=200&width=200", floorPrice: 80, locked: false },
]

export function UserNFTs() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-text">Your NFTs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userNFTs.map((nft) => (
          <Card key={nft.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">{nft.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square">
                <Image
                  src={nft.image}
                  alt={nft.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                {nft.locked ? (
                  <div className="absolute top-2 right-2 bg-cyan-500 rounded-full p-1">
                    <Lock className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 bg-purple-500 rounded-full p-1">
                    <Unlock className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-gray-400">Floor Price</span>
              <span className="font-bold">{nft.floorPrice} SOUL</span>
            </CardFooter>
            <CardFooter>
              <Button className="w-full gradient-button">
                {nft.locked ? "Unlock NFT" : "Lock NFT"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

