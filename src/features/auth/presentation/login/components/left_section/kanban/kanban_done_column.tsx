import { useTranslation } from "react-i18next";
import { KanbanColumn } from "./kanban_column";
import { KanbanDoneCard } from "./kanban_done_card";

export const KanbanDoneColumn = () => {
  const { t } = useTranslation("login");

  return (
    <KanbanColumn
      title={t("kanban.done")}
      count={4}
      dotClassName="bg-emerald-400"
    >
      <KanbanDoneCard
        title={t("kanban.doneTaskOne")}
        barWidthClassName="w-1/2"
      />
      <KanbanDoneCard
        title={t("kanban.doneTaskTwo")}
        barWidthClassName="w-3/5"
      />
    </KanbanColumn>
  );
};
