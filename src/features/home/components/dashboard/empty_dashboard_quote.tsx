import { Quote } from "lucide-react";

export type EmptyDashboardQuoteProps = {
  text: string;
  author: string;
};

export const EmptyDashboardQuote = ({ text, author }: EmptyDashboardQuoteProps) => {
  return (
    <div className="mt-8 flex flex-col items-center border-t border-secondary-200/70 pt-6 text-center">
      <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-xl border border-secondary-200/80 bg-secondary-50/70 px-3.5 py-2 shadow-sm backdrop-blur-md">
        <Quote className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
        <p className="text-xs tracking-wide text-secondary-600 italic">{text}</p>
        <span className="ml-1 text-[11px] font-semibold text-secondary-400 not-italic">
          — {author}
        </span>
      </div>
    </div>
  );
};
