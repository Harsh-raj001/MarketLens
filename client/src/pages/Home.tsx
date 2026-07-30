import { HeroSection } from "@/components/home/HeroSection";
import { WhySection } from "@/components/home/WhySection";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";
import { FeatureGridSection } from "@/components/home/FeatureGridSection";
import { JourneySection } from "@/components/home/JourneySection";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <HeroSection />
      <WhySection />
      <ShowcaseSection />
      <FeatureGridSection />
      <JourneySection />
      <EcosystemSection />
      <SocialProofSection />
      <FinalCTASection />
    </div>
  );
}
