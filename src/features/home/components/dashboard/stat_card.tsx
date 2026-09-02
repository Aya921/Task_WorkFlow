import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type StatCardProps = {
  title: string;
  value: number;
  suffix?: string;
  trend: number;
  subtitle: string;
  accent: string;
  icon: LucideIcon;
};

export const StatCard = ({
  title,
  value,
  suffix = "",
  trend,
  subtitle,
  accent,
  icon: Icon,
}: StatCardProps) => {
  const valueRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!valueRef.current) return;

    const target = { current: 0 };

    gsap.fromTo(
      target,
      { current: 0 },
      {
        current: value,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: () => {
          const formatted = Math.round(target.current);
          valueRef.current!.textContent = `${formatted}${suffix}`;
        },
      },
    );
  }, [suffix, value]);

  return (
    <div
      data-animate="card"
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-24px_rgba(37,99,235,0.25)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="mt-4 flex items-end gap-2">
            <span ref={valueRef} className="text-3xl font-bold tracking-tight text-slate-900">
              0{suffix}
            </span>
          </div>
        </div>

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg"
          style={{ background: accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
          <ArrowUpRight className="h-3.5 w-3.5" />
          {trend}%
        </div>
        <span className="text-xs text-slate-500">{subtitle}</span>
      </div>
    </div>
  );
};
