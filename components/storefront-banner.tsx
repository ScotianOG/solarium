import { Button } from "@/components/ui/button"
import { Edit } from 'lucide-react'

export function StorefrontBanner() {
  return (
    <div className="relative h-64 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">CryptoWhale's Emporium</h1>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 bg-white/10 border-white/20 hover:bg-white/20"
      >
        <Edit className="h-4 w-4 text-white" />
      </Button>
    </div>
  )
}

