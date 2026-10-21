import { useTranslation } from "react-i18next";
import { KanbanColumn } from "./kanban_column";
import { KanbanSkeletonCard } from "./kanban_skeleton_card";

export const KanbanTodoColumn = () => {
  const { t } = useTranslation("login");

  return (
    <KanbanColumn
      title={t("kanban.todo")}
      count={2}
      dotClassName="bg-secondary-300"
    >
      <KanbanSkeletonCard
        barWidthClassName="w-3/4"
        priorityLabel={t("kanban.low")}
        priorityClassName="bg-sky-50 text-sky-700"
        avatarClassName="bg-secondary-300"
      />
      <KanbanSkeletonCard
        barWidthClassName="w-4/5"
        priorityLabel={t("kanban.med")}
        priorityClassName="bg-amber-50 text-amber-700"
        avatarClassName="bg-primary-200"
      />
    </KanbanColumn>
  );
};
