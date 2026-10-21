import { useTranslation } from "react-i18next";

export const KanbanPreviewHeader = () => {
  const { t } = useTranslation("login");

  return (
    <div className="flex items-center justify-between border-b border-white/15 pb-3">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ms-2 text-xs font-medium text-white/80">
          {t("kanban.sprint")}
        </span>
      </div>
      <span className="rounded-full border border-sky-400/40 bg-sky-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-sky-200">
        {t("kanban.complete")}
      </span>
    </div>
  );
};
