import Link from "next/link"
import { Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-gray-800/50">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-semibold text-white">SOLarium</span>
            </div>
            <p className="text-sm text-gray-400">SOLarium ©2024 - NFT Vault & Marketplace</p>
          </div>
          
          {["Explore", "Create", "Community"].map((title, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-white font-semibold">{title}</h3>
              <ul className="space-y-2">
                {["NFTs", "Creators", "Collections", "About"].map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

