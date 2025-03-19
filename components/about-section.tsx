import Image from "next/image"

export function AboutSection() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        <div className="relative">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/20 blur-[100px] rounded-full" />
          <Image
            src="/placeholder.svg?height=400&width=400&text=SOLarium"
            alt="SOLarium Illustration"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl font-bold gradient-text">What is SOLarium?</h2>
        <p className="text-gray-400">
          SOLarium is a dedicated vault and marketplace for NFT art and social content created on SOLspace. 
          When users mint NFTs, a portion of the minting price is used to buy SOLess tokens, 
          establishing a guaranteed floor price and ensuring lasting value for every piece.
        </p>
      </div>
    </div>
  )
}

