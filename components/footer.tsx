import Link from "next/link";
import { Facebook, Twitter, Instagram, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="bg-background/80 backdrop-blur-md border-t border-border"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-semibold text-foreground">SOLarium</span>
            </div>
            <p className="text-sm text-muted-foreground">
              SOLarium ©2024 - NFT Vault & Marketplace
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-full p-1"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </Link>
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-full p-1"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-full p-1"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </Link>
            </div>
          </div>

          {[
            {
              title: "Explore",
              links: [
                { name: "NFTs", href: "/marketplace" },
                { name: "Creators", href: "/creators" },
                { name: "Collections", href: "/collections" },
                { name: "About", href: "/about" },
              ],
            },
            {
              title: "Create",
              links: [
                { name: "Create NFT", href: "/create-nft" },
                { name: "Create Collection", href: "/create-collection" },
                { name: "My Storefront", href: "/my-storefront" },
                { name: "Swift Swap", href: "/soless-swift-swap" },
              ],
            },
            {
              title: "Community",
              links: [
                { name: "Governance", href: "/governance" },
                { name: "Documentation", href: "/docs" },
                { name: "Learn", href: "/learn" },
                { name: "Support", href: "/support" },
              ],
            },
          ].map((section, index) => (
            <div key={index} className="space-y-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="text-foreground font-semibold" id={`footer-heading-${section.title.toLowerCase()}`}>{section.title}</h3>
              <ul className="space-y-2" aria-labelledby={`footer-heading-${section.title.toLowerCase()}`}>
                {section.links.map((link, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-sm flex items-center gap-1 w-fit"
                    >
                      {link.name}
                      {link.href.startsWith("http") && <ExternalLink size={12} />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} SOLess. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link 
                href="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
