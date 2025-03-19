import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const collections = [
  { name: "Cheems OG Collection", items: 500, floorPrice: 120 },
  { name: "Founders Collection", items: 100, floorPrice: 100 },
  { name: "Cheemsburgers", items: 1000, floorPrice: 95 },
  { name: "Genesis Collection", items: 1000, floorPrice: 85 },
]

export function UserCollections() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gradient-text">Top Collections</h2>
        <Button variant="link" className="text-cyan-400">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((collection, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">{collection.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square mb-4">
                <Image
                  src="/placeholder.svg"
                  alt={collection.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Items</span>
                <span className="font-bold">{collection.items}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-400">Floor Price</span>
                <span className="font-bold gradient-text">{collection.floorPrice} SOUL</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gradient-button">View Collection</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

