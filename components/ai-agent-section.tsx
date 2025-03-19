import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BotIcon as Robot } from 'lucide-react'
import Image from "next/image"

export function AIAgentSection() {
  return (
    <div className="bg-[#161616] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Create and Deploy Your NFT Collection with AI
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-300">
              Harness the power of artificial intelligence to streamline your NFT creation process. 
              Our AI agent guides you through every step, from conception to deployment on the Solana blockchain. Harness the power of DALL-E to create unique, AI-generated artwork for your NFTs, or upload your own images to bring your vision to life.
            </p>
            <div className="mt-8 space-x-4">
              <Button asChild className="gradient-button">
                <Link href="/deploy">Deploy Your Collection</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-700">
                <Link href="/faq">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="bg-[#1E1E1E] rounded-lg p-6 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-4">AI-Powered Creation</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">DALL-E AI art generation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">User-friendly interface</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">Step-by-step guidance</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">Automated deployment</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">No coding required</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <Image
                    src="/placeholder.svg?height=300&width=300&text=AI Art"
                    alt="AI-generated Art"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

