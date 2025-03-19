import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Layers, TrendingUp, Wallet } from 'lucide-react'

export function VaultOverview() {
  const vaultStats = {
    totalCollections: 8,
    totalItems: 4850,
    averageFloorPrice: 81.875,
    totalValue: 397187.5,
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
          <Layers className="h-4 w-4 text-cyan-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{vaultStats.totalCollections}</div>
          <p className="text-xs text-gray-400">Unique NFT collections</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <Wallet className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{vaultStats.totalItems.toLocaleString()}</div>
          <p className="text-xs text-gray-400">NFTs across all collections</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Floor Price</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{vaultStats.averageFloorPrice.toFixed(2)} SOUL</div>
          <p className="text-xs text-gray-400">Across all collections</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Vault Value</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold gradient-text">{vaultStats.totalValue.toLocaleString()} SOUL</div>
          <p className="text-xs text-gray-400">Based on floor prices</p>
        </CardContent>
      </Card>
    </div>
  )
}

