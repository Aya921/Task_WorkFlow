import { useTranslation } from "react-i18next";
import { KanbanActiveCard } from "./kanban_active_card";
import { KanbanColumn } from "./kanban_column";
import { KanbanDropTarget } from "./kanban_drop_target";

export const KanbanInProgressColumn = () => {
  const { t } = useTranslation("login");

  return (
    <KanbanColumn
      title={t("kanban.inProgress")}
      count={1}
      dotClassName="bg-amber-400"
    >
      <KanbanActiveCard />
      <KanbanDropTarget />
    </KanbanColumn>
  );
};
