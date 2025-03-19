import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Globe } from 'lucide-react'

export function Header() {
  return (
    <header className="h-14 bg-black border-b border-gray-800/50 sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-cyan-400 font-medium">
            SOLess
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/solspace" className="text-gray-400 hover:text-white transition-colors">
              SOLspace
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              SOLarium
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            EN
            <Globe className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </header>
  )
}

