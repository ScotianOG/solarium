"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Wallet,
  Store,
  ShoppingBag,
  PlusCircle,
  User,
  Vote,
  ArrowLeftRight,
  LayoutDashboard,
  Boxes,
  LineChart,
  Bot,
  GraduationCap,
  Library,
  X,
  Menu,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

// Declare global interface for window object
declare global {
  interface Window {
    toggleSidebar?: () => void;
  }
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function SidebarItem({ href, icon, children, className }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground rounded-md hover:bg-sidebar-accent hover:text-sidebar-primary transition-colors focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar-background",
        className
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

export function Sidebar() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarEl = document.getElementById("sidebar");
      if (
        isMobile &&
        isOpen &&
        sidebarEl &&
        !sidebarEl.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isOpen]);

  // Set body overflow when sidebar is open on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  // Close sidebar when window is resized from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Expose toggle function globally for the header component
  useEffect(() => {
    window.toggleSidebar = () => setIsOpen((prev) => !prev);

    return () => {
      // Clean up on unmount
      window.toggleSidebar = undefined;
    };
  }, []);

  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <div 
      id="sidebar"
      className={cn(
        "bg-sidebar-background border-r border-sidebar-border h-screen overflow-y-auto custom-scrollbar",
        isMobile 
          ? "fixed left-0 top-0 w-[280px] z-50 animate-in slide-in-from-left duration-300" 
          : "w-[200px] fixed left-0 top-0 pt-6 px-2"
      )}
    >
      <div className="px-3 mb-6 flex items-center justify-between pt-6">
        <h1 className="text-lg font-medium text-sidebar-primary">SOLarium</h1>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:text-sidebar-primary transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </Button>
        )}
      </div>

      <nav className="space-y-6">
        <div className="space-y-1">
          <SidebarItem
            href="/soless-dashboard"
            icon={<LayoutDashboard size={18} />}
          >
            Dashboard
          </SidebarItem>
          <SidebarItem href="/marketplace" icon={<ShoppingBag size={18} />}>
            Marketplace
          </SidebarItem>
          <SidebarItem href="/vault" icon={<Wallet size={18} />}>
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
          <SidebarItem
            href="/soless-swift-swap"
            icon={<ArrowLeftRight size={18} />}
          >
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
  );
}
