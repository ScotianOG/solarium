import Link from "next/link"
import { cn } from "@/lib/utils"
import { Wallet, Store, ShoppingBag, PlusCircle, User, Vote, ArrowLeftRight, LayoutDashboard, Boxes, LineChart, Bot, GraduationCap, Library } from 'lucide-react'

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}

function SidebarItem({ href, icon, children, className }: SidebarItemProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm text-gray-400 rounded-md hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors",
        className
      )}
    >
      {icon}
      {children}
    </Link>
  )
}

export function Sidebar() {
  return (
    <div className="w-[200px] bg-black border-r border-gray-800/50 h-screen fixed left-0 top-0 pt-6 px-2 overflow-y-auto custom-scrollbar">
      <div className="px-3 mb-6">
        <h1 className="text-lg font-medium text-cyan-400">SOLarium</h1>
      </div>
      
      <nav className="space-y-6">
        <div className="space-y-1">
          <SidebarItem href="/soless-dashboard" icon={<LayoutDashboard size={18} />}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="/marketplace" icon={<ShoppingBag size={18} />}>
            Marketplace
          </SidebarItem>
          <SidebarItem href="/my-vault" icon={<Wallet size={18} />}>
            My Vault
          </SidebarItem>
          <SidebarItem href="/my-storefront" icon={<Store size={18} />}>
            My Storefront
          </SidebarItem>
        </div>

        <div className="space-y-1">
          <SidebarItem href="/create-nft" icon={<PlusCircle size={18} />}>
            Create NFT
          </SidebarItem>
          <SidebarItem href="/create-collection" icon={<Boxes size={18} />}>
            Create Collection
          </SidebarItem>
          <SidebarItem href="/deploy" icon={<Bot size={18} />}>
            Create with AI
          </SidebarItem>
        </div>

        <div className="space-y-1">
          <SidebarItem href="/profile" icon={<User size={18} />}>
            Profile
          </SidebarItem>
          <SidebarItem href="/analytics" icon={<LineChart size={18} />}>
            Analytics
          </SidebarItem>
          <SidebarItem href="/soless-swift-swap" icon={<ArrowLeftRight size={18} />}>
            SwiftSwap
          </SidebarItem>
        </div>

        <div className="space-y-1">
          <SidebarItem href="/governance" icon={<Vote size={18} />}>
            Governance
          </SidebarItem>
          <SidebarItem href="/learn" icon={<GraduationCap size={18} />}>
            Learn
          </SidebarItem>
          <SidebarItem href="/docs" icon={<Library size={18} />}>
            Docs
          </SidebarItem>
        </div>
      </nav>
    </div>
  )
}

