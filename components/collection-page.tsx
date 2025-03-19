import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface NFTItem {
  id: number
  name: string
  image: string
}

interface CollectionPageProps {
  name: string
  description: string
  items: NFTItem[]
}

export function CollectionPage({ name, description, items }: CollectionPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-4">{name}</h1>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="bg-[#161616] border-gray-800">
            <CardContent className="p-4">
              <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="font-medium">{item.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="gradient-button">View on Marketplace</Button>
      </div>
    </div>
  )
}

