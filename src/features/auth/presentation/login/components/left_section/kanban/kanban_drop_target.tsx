import { useTranslation } from "react-i18next";

export const KanbanDropTarget = () => {
  const { t } = useTranslation("login");

  return (
    <div className="rounded-lg border border-dashed border-sky-300/40 bg-sky-500/10 p-2 text-center text-[10px] text-sky-200">
      {t("kanban.dropTarget")}
    </div>
  );
};
