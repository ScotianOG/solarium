import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Layers } from 'lucide-react'

interface Collection {
  id: number;
  name: string;
  image: string;
  floorPrice: number;
  totalItems: number;
  change24h: number;
}

const collections: Collection[] = [
  { id: 1, name: "Founders Collection", image: "/placeholder.svg?height=200&width=200", floorPrice: 100, totalItems: 100, change24h: 5.2 },
  { id: 2, name: "Genesis Collection", image: "/placeholder.svg?height=200&width=200", floorPrice: 85, totalItems: 1000, change24h: -2.1 },
  { id: 3, name: "Daft Droids V1.0", image: "/placeholder.svg?height=200&width=200", floorPrice: 75, totalItems: 500, change24h: 1.8 },
  { id: 4, name: "Toke.n Seed Collection", image: "/placeholder.svg?height=200&width=200", floorPrice: 60, totalItems: 250, change24h: 0.5 },
  { id: 5, name: "Toke.n Farmland", image: "/placeholder.svg?height=200&width=200", floorPrice: 50, totalItems: 750, change24h: -1.3 },
  { id: 6, name: "Cheemsburgers", image: "/placeholder.svg?height=200&width=200", floorPrice: 95, totalItems: 1000, change24h: 7.5 },
  { id: 7, name: "Cheems OG Collection", image: "/placeholder.svg?height=200&width=200", floorPrice: 120, totalItems: 500, change24h: 3.2 },
  { id: 8, name: "Pixel Cheems", image: "/placeholder.svg?height=200&width=200", floorPrice: 70, totalItems: 750, change24h: -0.8 },
]

export function CollectionsOverview() {
  const sortedCollections = collections.sort((a, b) => b.floorPrice - a.floorPrice);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-text">Your Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCollections.map((collection) => (
          <Card key={collection.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">{collection.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square mb-4">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                <div className="absolute top-2 right-2 bg-gray-900/80 rounded-full p-1">
                  <Layers className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Floor Price</span>
                <span className="font-bold gradient-text">{collection.floorPrice} SOUL</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-400">Total Items</span>
                <span className="font-bold">{collection.totalItems}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-400">24h Change</span>
                <span className={`font-bold flex items-center ${collection.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {collection.change24h >= 0 ? '+' : ''}{collection.change24h}%
                  <ArrowUpRight className={`h-4 w-4 ml-1 ${collection.change24h >= 0 ? '' : 'rotate-180'}`} />
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gradient-button">
                View Collection
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

