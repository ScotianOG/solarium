import { QuickSwap } from "@/components/quick-swap"

export default function QuickSwapPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold gradient-text mb-6">QuickSwap</h1>
      <p className="text-gray-400 max-w-3xl mb-8">
        Easily swap between SOL, SOLess, and other supported tokens using our QuickSwap feature.
      </p>
      <QuickSwap />
    </div>
  )
}

