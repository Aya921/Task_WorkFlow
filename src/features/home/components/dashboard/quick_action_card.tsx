import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../../../../shared/components/button";

type QuickActionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

export const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  accent,
}: QuickActionCardProps) => {
  return (
    <Button
      type="button"
      wrapperClassName="w-full"
      className="group w-full flex-col items-stretch rounded-2xl p-4 text-left shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] hover:-translate-y-1 hover:shadow-[0_24px_55px_-28px_rgba(37,99,235,0.3)]"
      activeClassName="border-slate-200 bg-white"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
          style={{ background: accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <div className="mt-5">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </Button>
  );
};
