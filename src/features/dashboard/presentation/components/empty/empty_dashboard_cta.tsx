import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";

export type EmptyDashboardAction = {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
};

export type EmptyDashboardCtaProps = {
  title: ReactNode;
  description: string;
  primaryAction: EmptyDashboardAction;
};

export const EmptyDashboardCta = ({
  title,
  description,
  primaryAction,
}: EmptyDashboardCtaProps) => {
  const PrimaryIcon = primaryAction.icon;

  return (
    <div className="mx-auto w-full max-w-md">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-secondary-900">
        {title}
      </h2>
      <p className={`${FONT_STYLES.bodySm} mb-6 leading-relaxed text-secondary-500`}>
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          onClick={primaryAction.onClick}
          wrapperClassName="inline-flex"
          className="rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md shadow-primary-500/25"
          activeClassName="bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30"
        >
          {PrimaryIcon ? <PrimaryIcon className="h-4 w-4" aria-hidden /> : null}
          <span>{primaryAction.label}</span>
        </Button>
      </div>
    </div>
  );
};
