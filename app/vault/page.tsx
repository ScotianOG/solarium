import { VaultOverview } from "@/components/vault-overview"
import { CollectionsOverview } from "@/components/collections-overview"

export default function VaultPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Your SOLarium Vault</h1>
        <p className="text-gray-400 max-w-3xl">
          Welcome to your personal vault. Here you can manage your NFT collections, track their value, 
          and view important statistics. Your collections are ranked by floor price, giving you a quick 
          overview of your most valuable assets.
        </p>
      </div>
      <VaultOverview />
      <CollectionsOverview />
    </div>
  )
}

