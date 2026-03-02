import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { WritingSection } from "@/components/writing-section"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <WritingSection />
        <ProjectsSection />
        <AboutSection />
      </main>
      <SiteFooter />
    </>
  )
}
