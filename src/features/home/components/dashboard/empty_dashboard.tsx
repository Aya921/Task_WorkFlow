import type { ReactNode } from "react";
import dashboardBg from "../../../../assets/images/dashboard_bg.png";
import { EmptyDashboardAnimation } from "./empty_dashboard_animation";
import {
  EmptyDashboardCta,
  type EmptyDashboardCtaProps,
} from "./empty_dashboard_cta";
import {
  EmptyDashboardHeader,
  type EmptyDashboardHeaderProps,
} from "./empty_dashboard_header";

  
 

export type EmptyDashboardProps = {
  header: EmptyDashboardHeaderProps;
  animation: ReactNode;
  cta: EmptyDashboardCtaProps;
 
};

export const EmptyDashboard = ({
  header,
  animation,
  cta,
  
}: EmptyDashboardProps) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background py-4 lg:pt-10">
      <img
        src={dashboardBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-6 text-center lg:px-8">
        {/* header that has the workspace name and welcome message */}
        <EmptyDashboardHeader {...header} />

        {/* animation */}
        <EmptyDashboardAnimation>{animation}</EmptyDashboardAnimation>

        {/* second description with buttons */}
        <EmptyDashboardCta {...cta} />

        
        
      </div>
    </section>
  );
};
