import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 py-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight gradient-text">
          Welcome to SOLarium
          <br />
          Discover, and collect NFTs
        </h1>
        <p className="text-gray-400 max-w-lg">
          Secure, enhance, and monetize your NFTs with guaranteed floor prices backed by SOLess tokens.
        </p>
        <div className="flex gap-4">
          <Button className="gradient-button">Connect Wallet</Button>
          <Button variant="outline" className="border-gray-800 hover:bg-gray-800">Learn More →</Button>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/20 blur-[100px] rounded-full" />
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cyan-500 w-24 h-24 rounded-2xl" />
          <div className="bg-purple-500/20 w-16 h-16 rounded-xl mt-12" />
          <div className="bg-blue-500/20 w-16 h-16 rounded-xl" />
          <div className="bg-cyan-500 w-32 h-32 rounded-2xl mt-8" />
        </div>
      </div>
    </div>
  )
}

