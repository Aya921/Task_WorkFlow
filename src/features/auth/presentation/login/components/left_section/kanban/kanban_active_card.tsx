import { useTranslation } from "react-i18next";

export const KanbanActiveCard = () => {
  const { t } = useTranslation("login");

  return (
    <div className="-rotate-1 space-y-2 rounded-lg border border-secondary-200 bg-white p-2.5 text-secondary-800 shadow-lg ring-2 ring-sky-400/70">
      <div className="line-clamp-1 text-[11px] font-semibold text-secondary-900">
        {t("kanban.activeTask")}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary-100">
        <div className="h-full w-3/4 rounded-full bg-primary-600" />
      </div>
      <div className="flex items-center justify-between pt-0.5">
        <span className="rounded border border-rose-200/50 bg-rose-50 px-1.5 py-0.5 text-[9px] font-semibold text-rose-600">
          {t("kanban.high")}
        </span>
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white shadow-sm">
          SJ
        </div>
      </div>
    </div>
  );
};
