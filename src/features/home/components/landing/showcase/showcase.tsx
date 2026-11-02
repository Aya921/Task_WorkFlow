import { LandingInView } from "../landing_in_view";
import { ShowcaseBenefits } from "./benefits";
import { ShowcasePreview } from "./preview";

export const LandingShowcase = () => {
  return (
    <LandingInView
      id="showcase"
      className="border-y border-secondary-200 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ShowcasePreview />
          </div>
          <div className="lg:col-span-5">
            <ShowcaseBenefits />
          </div>
        </div>
      </div>
    </LandingInView>
  );
};
