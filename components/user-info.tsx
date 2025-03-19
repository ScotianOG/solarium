import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Share2 } from 'lucide-react'
import Image from "next/image"

export function UserInfo() {
  const favoriteNFT = {
    name: "Cheems #1337",
    image: "/placeholder.svg?height=150&width=150"
  }

  const rareNFT = {
    name: "Daft Droid #42",
    image: "/placeholder.svg?height=150&width=150"
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <div className="relative h-48 mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-end space-x-4">
            <Avatar className="w-32 h-32 border-4 border-gray-900">
              <AvatarImage src="/placeholder.svg" alt="@username" />
              <AvatarFallback>CW</AvatarFallback>
            </Avatar>
            <div className="bg-gray-900 p-2 rounded-lg">
              <Image src={favoriteNFT.image} alt={favoriteNFT.name} width={75} height={75} className="rounded" />
              <p className="text-xs text-center mt-1">Favorite</p>
            </div>
            <div className="bg-gray-900 p-2 rounded-lg">
              <Image src={rareNFT.image} alt={rareNFT.name} width={75} height={75} className="rounded" />
              <p className="text-xs text-center mt-1">Rarest</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start mt-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">CryptoWhale</h2>
            <p className="text-gray-400">Joined April 2023</p>
            <p className="text-sm text-gray-400">0x1234...5678</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="border-gray-800 hover:bg-gray-800">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-800 hover:bg-gray-800">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-400">
            Passionate NFT collector and crypto enthusiast. Always on the lookout for the next big thing in the digital art world.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

