import { HeroSection } from "@/components/home/hero-section"
import { FeatureCards } from "@/components/home/feature-cards"
import { StatsSection } from "@/components/home/stats-section"
import { VisualNarrative } from "@/components/home/visual-narrative"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <VisualNarrative />
      <StatsSection />
    </>
  )
}
