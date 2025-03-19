import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const nfts = [
  { name: "Cheems #1337", collection: "Cheemsburgers", price: 95, type: "buy-now" },
  { name: "Daft Droid #42", collection: "Daft Droids V1.0", price: 75, type: "auction" },
  { name: "Toke.n Seed #007", collection: "Toke.n Seed Collection", price: 60, type: "buy-now" },
  { name: "Pixel Cheems #24", collection: "Pixel Cheems", price: 70, type: "auction" },
  { name: "Founder's Token #001", collection: "Founders Collection", price: 150, type: "buy-now" },
  { name: "Genesis Artwork #10", collection: "Genesis Collection", price: 200, type: "auction" },
]

interface StorefrontGalleryProps {
  filter: string
  sort: string
}

export function StorefrontGallery({ filter, sort }: StorefrontGalleryProps) {
  let filteredNFTs = nfts

  if (filter !== "all") {
    filteredNFTs = nfts.filter(nft => nft.type === filter)
  }

  filteredNFTs.sort((a, b) => {
    if (sort === "price") return a.price - b.price
    if (sort === "collection") return a.collection.localeCompare(b.collection)
    return 0 // For "rarity", we'd need additional data
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredNFTs.map((nft, index) => (
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
            <Button className="w-full gradient-button">
              {nft.type === "buy-now" ? "Buy Now" : "Place Bid"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

