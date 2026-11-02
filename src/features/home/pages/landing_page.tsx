import { LandingCallToActionBand } from "../components/landing/call_to_action_band";
import { LandingFaq } from "../components/landing/faq";
import { LandingFeatures } from "../components/landing/features";
import { LandingFooter } from "../components/landing/footer";
import { LandingHeader } from "../components/landing/header";
import { LandingHero } from "../components/landing/hero";
import { LandingHowItWorks } from "../components/landing/how_it_works/how_it_works";
import { LandingShowcase } from "../components/landing/showcase/showcase";

export const LandingPage = () => {
  return (
    <main className="min-h-dvh bg-secondary-50 text-secondary-900 antialiased">
      <LandingHeader />
      {/* Matches fixed header height so content doesn't sit underneath */}
      <div className="h-16 sm:h-[4.5rem]" aria-hidden />
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingShowcase />
      <LandingFaq />
      <LandingCallToActionBand />
      <LandingFooter />
    </main>
  );
};
