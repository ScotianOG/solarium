import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

const items = Array(12).fill({
  name: "NFT Name",
  collection: "Collection Name",
  price: "0.001 SOUL"
})

export function CollectedGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <Card key={index} className="bg-[#161616] border-gray-800">
          <CardContent className="p-4">
            <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
              <Image
                src="/placeholder.svg"
                alt={item.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.collection}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm text-gray-400">Price</span>
              <span className="font-medium">{item.price}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

