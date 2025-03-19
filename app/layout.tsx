import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { GlobalStyles } from "@/components/global-styles"
import "@/styles/globals.css"

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
    <html lang="en" className={`dark ${spaceGrotesk.variable}`}>
      <body className={`${spaceGrotesk.className} custom-scrollbar min-h-screen bg-black text-white`}>
        <Sidebar />
        <div className="pl-[200px]"> {/* Add left padding equal to sidebar width */}
          <Header />
          <main className="min-h-[calc(100vh-4rem)] p-6">
            {children}
          </main>
          <Footer />
        </div>
        <GlobalStyles />
      </body>
    </html>
  )
}
