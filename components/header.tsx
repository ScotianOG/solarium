import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Globe, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeSwitch } from "@/components/theme-switch";

export function Header() {
  const isMobile = useIsMobile();

  const handleSidebarToggle = () => {
    if (typeof window !== "undefined" && window.toggleSidebar) {
      window.toggleSidebar();
    }
  };

  return (
    <header className="h-14 bg-background border-b border-border sticky top-0 z-50" role="banner">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              onClick={handleSidebarToggle}
              aria-label="Toggle menu"
              aria-expanded="false"
              aria-controls="sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link 
            href="/" 
            className="text-primary-foreground font-medium focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
            aria-label="SOLess Home"
          >
            SOLess
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-6">
            <Link 
              href="/solspace" 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
              aria-label="Navigate to SOLspace"
            >
              SOLspace
            </Link>
            <Link 
              href="/" 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
              aria-label="Navigate to SOLarium"
            >
              SOLarium
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeSwitch />
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Change language"
          >
            EN
            <Globe className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </header>
  );
}
