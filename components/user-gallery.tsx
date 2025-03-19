import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const nfts = [
  { name: "Cheems #1337", collection: "Cheemsburgers", price: 95 },
  { name: "Daft Droid #42", collection: "Daft Droids V1.0", price: 75 },
  { name: "Toke.n Seed #007", collection: "Toke.n Seed Collection", price: 60 },
  { name: "Pixel Cheems #24", collection: "Pixel Cheems", price: 70 },
]

export function UserGallery() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gradient-text">My NFTs</h2>
        <Button variant="link" className="text-cyan-400">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nfts.map((nft, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">{nft.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square mb-4">
                <Image
                  src="/placeholder.svg"
                  alt={nft.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{nft.collection}</span>
                <span className="font-bold gradient-text">{nft.price} SOUL</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gradient-button">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

