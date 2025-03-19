import { MarketplaceGrid } from "@/components/marketplace-grid"
import { MarketplaceFilters } from "@/components/marketplace-filters"
import { TopCollections } from "@/components/top-collections"

export default function MarketplacePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">NFT Marketplace</h1>
        <p className="text-gray-400 max-w-3xl">
          Welcome to the SOLarium marketplace! Here you can buy and sell unique NFTs backed by 
          SOLess tokens. Each purchase comes with a guaranteed floor price, ensuring the value 
          of your investment. Start trading now!
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <MarketplaceFilters />
        </div>
        <div className="w-full md:w-3/4">
          <MarketplaceGrid />
        </div>
      </div>
      <TopCollections />
    </div>
  )
}

