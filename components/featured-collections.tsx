import Image from "next/image"
import { Button } from "@/components/ui/button"

export function FeaturedCollections() {
  const collections = [
    { name: "SOLart Masterpieces", image: "/placeholder.svg?height=300&width=300" },
    { name: "Crypto Landscapes", image: "/placeholder.svg?height=300&width=300" },
    { name: "Digital Dreamscapes", image: "/placeholder.svg?height=300&width=300" },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold gradient-text">Featured Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection, index) => (
          <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src={collection.image}
              alt={collection.name}
              width={300}
              height={300}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
              <Button className="w-full gradient-button">View Collection</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

