import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Bookmark, TrendingUp } from 'lucide-react'

interface NFTItem {
  id: number;
  title: string;
  creator: string;
  price: number;
  image: string;
  timeLeft: string;
  trending: boolean;
}

const nftItems: NFTItem[] = [
  { id: 1, title: "Cosmic Horizon #1", creator: "StellarArtist", price: 2.5, image: "/placeholder.svg?height=300&width=300", timeLeft: "2 hours", trending: true },
  { id: 2, title: "Digital Dreams #42", creator: "CryptoVisionary", price: 1.8, image: "/placeholder.svg?height=300&width=300", timeLeft: "1 day", trending: false },
  { id: 3, title: "Neon Nights #7", creator: "UrbanPixel", price: 3.2, image: "/placeholder.svg?height=300&width=300", timeLeft: "5 hours", trending: true },
  { id: 4, title: "Abstract Realms #15", creator: "ArtificialMuse", price: 2.0, image: "/placeholder.svg?height=300&width=300", timeLeft: "3 days", trending: false },
  { id: 5, title: "Quantum Quill #3", creator: "FutureBrush", price: 4.5, image: "/placeholder.svg?height=300&width=300", timeLeft: "12 hours", trending: true },
  { id: 6, title: "Ethereal Echoes #9", creator: "DreamWeaver", price: 3.7, image: "/placeholder.svg?height=300&width=300", timeLeft: "2 days", trending: false },
];

export function MarketplaceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nftItems.map((item) => (
        <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 transition-all hover:shadow-lg hover:shadow-purple-500/20">
          <div className="relative">
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={300}
              className="w-full object-cover aspect-square"
            />
            {item.trending && (
              <div className="absolute top-2 left-2 bg-purple-500 rounded-full px-2 py-1 text-xs text-white flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </div>
            )}
            <div className="absolute top-2 right-2 bg-black/50 rounded-full px-2 py-1 text-xs text-white">
              {item.timeLeft} left
            </div>
          </div>
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-400">by {item.creator}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Current Price</span>
              <span className="text-lg font-bold gradient-text">{item.price} SOUL</span>
            </div>
            <div className="flex justify-between items-center">
              <Button variant="ghost" className="text-gray-400 hover:text-purple-400">
                <Bookmark className="w-4 h-4 mr-1" />
                Watch
              </Button>
              <Button className="gradient-button">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

