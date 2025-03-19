import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { AIAgentSection } from "@/components/ai-agent-section"

export default function HomePage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <AboutSection />
      <AIAgentSection />
    </div>
  )
}

