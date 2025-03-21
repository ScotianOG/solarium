"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCard, AnimatedCardImage } from "@/components/ui/animated-card"
import { Calendar, Clock, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

// Mock data for upcoming mints
const UPCOMING_MINTS = [
  {
    id: "cosmic-explorers",
    name: "Cosmic Explorers",
    description: "A collection of 5,000 space travelers exploring the cosmos. Each explorer has unique traits and abilities.",
    price: 2.5,
    currency: "SOL",
    date: "2025-05-15T14:00:00Z",
    image: "/placeholder.jpg",
    tags: ["PFP", "Metaverse", "Gaming"]
  },
  {
    id: "digital-dreams",
    name: "Digital Dreams",
    description: "Enter the dream world with these 3,333 surreal art pieces. Each NFT opens access to exclusive digital experiences.",
    price: 1.8,
    currency: "SOL",
    date: "2025-04-28T18:00:00Z",
    image: "/placeholder.jpg",
    tags: ["Art", "Utility", "Community"]
  },
  {
    id: "crypto-creatures",
    name: "Crypto Creatures",
    description: "Collect 10,000 unique creatures inspired by blockchain technology. Stake your creatures to earn $CRYP tokens.",
    price: 0.8,
    currency: "SOL",
    date: "2025-05-02T16:00:00Z",
    image: "/placeholder.jpg",
    tags: ["Gaming", "Staking", "Play-to-Earn"]
  }
]

// Helper function to format date
const formatMintDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric", 
    year: "numeric" 
  })
}

// Helper function to format time
const formatMintTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", { 
    hour: "2-digit", 
    minute: "2-digit", 
    timeZoneName: "short" 
  })
}

// Helper to calculate time remaining
const getTimeRemaining = (dateString: string) => {
  const targetDate = new Date(dateString).getTime()
  const now = new Date().getTime()
  const difference = targetDate - now
  
  if (difference <= 0) return "Minting now!"
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (days > 0) {
    return `${days}d ${hours}h remaining`
  }
  
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`
  }
  
  return `${minutes}m remaining`
}

export function UpcomingMints() {
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>({})
  
  // Update countdown timer every minute
  useEffect(() => {
    const calculateAllTimeRemaining = () => {
      const times: Record<string, string> = {}
      
      UPCOMING_MINTS.forEach(mint => {
        times[mint.id] = getTimeRemaining(mint.date)
      })
      
      setTimeRemaining(times)
    }
    
    // Initial calculation
    calculateAllTimeRemaining()
    
    // Update every minute
    const interval = setInterval(calculateAllTimeRemaining, 60000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Upcoming Mints</h2>
        <Link href="/upcoming-mints" className="text-cyan-400 hover:underline text-sm">
          View all upcoming mints
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {UPCOMING_MINTS.map((mint, index) => (
          <AnimatedCard 
            key={mint.id}
            delay={index * 100}
            className="hover-lift"
          >
            <div className="relative">
              <AnimatedCardImage
                aspectRatio="square"
                overlay
                src={mint.image}
                alt={mint.name}
                width={400}
                height={400}
              />
              <Badge className="absolute top-3 right-3 bg-cyan-600 hover:bg-cyan-700 text-white">
                {mint.price} {mint.currency}
              </Badge>
            </div>
            
            <CardHeader className="p-4 pb-0">
              <CardTitle className="line-clamp-1">{mint.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 space-y-2">
              <p className="text-sm text-muted-foreground line-clamp-2">{mint.description}</p>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">{formatMintDate(mint.date)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-xs">{formatMintTime(mint.date)}</span>
              </div>
              
              {timeRemaining[mint.id] && (
                <Badge variant="outline" className="bg-background text-primary border-primary">
                  {timeRemaining[mint.id]}
                </Badge>
              )}
              
              <div className="flex flex-wrap gap-2 pt-2">
                {mint.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <Button className="w-full gradient-button">
                Set Reminder
              </Button>
            </CardFooter>
          </AnimatedCard>
        ))}
      </div>
    </div>
  )
}
