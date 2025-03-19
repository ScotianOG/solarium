"use client"

import { TokenAllocationChart } from "@/components/token-allocation-chart"
import { BurningMechanisms } from "@/components/burning-mechanisms"
import { NFTIntegration } from "@/components/nft-integration"

export default function SOLessDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold gradient-text mb-6">SOLess Token Dashboard</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Token Allocation</h2>
        <TokenAllocationChart />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Burning Mechanisms</h2>
        <BurningMechanisms />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">NFT Integration</h2>
        <NFTIntegration />
      </section>
    </div>
  )
}

