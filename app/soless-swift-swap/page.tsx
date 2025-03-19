import { SOLessSwiftSwap } from "@/components/soless-swift-swap"

export default function SOLessSwiftSwapPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold gradient-text mb-6">SOLess SwiftSwap</h1>
      <p className="text-gray-400 max-w-3xl mb-8">
        Quickly swap between SOL, SOLess, and other supported tokens using our SOLess SwiftSwap feature. Choose your preferred gas token for the transaction.
      </p>
      <SOLessSwiftSwap />
    </div>
  )
}

