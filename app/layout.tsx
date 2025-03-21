import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { ClientHeader } from "@/components/client-header"
import { Footer } from "@/components/footer"
import { ClientSidebar } from "@/components/client-sidebar"
import { GlobalStyles } from "@/components/global-styles"
import { ThemeProvider } from "@/components/theme-provider"
import { AppProvider } from "@/lib/state/app-context"
import { SkipLink } from "@/components/ui/skip-link"
import "@/styles/globals.css"
import "@/styles/animations.css"

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'SOLarium - NFT Vault & Marketplace',
  description: 'Secure, enhance, and monetize your NFTs with SOLarium',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body className={`${spaceGrotesk.className} custom-scrollbar min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppProvider>
            <SkipLink href="#main-content" />
            <ClientSidebar />
            <div className="md:pl-[200px]"> {/* Use responsive padding */}
              <ClientHeader />
              <main 
                id="main-content" 
                className="min-h-[calc(100vh-4rem)] p-4 md:p-6 animate-fade-in"
                tabIndex={-1} // Allows focus for skip link but doesn't add to tab order
              >
                {children}
              </main>
              <Footer />
            </div>
            <GlobalStyles />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
