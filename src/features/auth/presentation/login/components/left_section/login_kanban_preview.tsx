import { KanbanDoneColumn } from "./kanban/kanban_done_column";
import { KanbanInProgressColumn } from "./kanban/kanban_in_progress_column";
import { KanbanPreviewHeader } from "./kanban/kanban_preview_header";
import { KanbanTodoColumn } from "./kanban/kanban_todo_column";

export const LoginKanbanPreview = () => {
  return (
    <div className="relative space-y-4 rounded-2xl border border-white/20 bg-secondary-900/30 p-5 shadow-2xl backdrop-blur-xl select-none">
      <KanbanPreviewHeader />

      <div className="grid grid-cols-3 gap-3">
        <KanbanTodoColumn />
        <KanbanInProgressColumn />
        <KanbanDoneColumn />
      </div>
    </div>
  );
};
