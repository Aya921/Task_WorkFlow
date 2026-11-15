import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { getInitials } from "../../utils/get_initials";
import type { CreateProjectMember } from "./create_project_member";

type CreateProjectPreviewProps = {
  name: string;
  color: string;
  members: CreateProjectMember[];
};

export const CreateProjectPreview = ({
  name,
  color,
  members,
}: CreateProjectPreviewProps) => {
  const { t } = useTranslation("dashboard");
  const previewName = name.trim() || t("createProject.preview.untitled");

  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-secondary-200 bg-secondary-50/70 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
      <div className="flex min-w-0 items-start gap-3">
        <span
          className="mt-1.5 size-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4
              className={`${FONT_STYLES.bodySm} truncate font-semibold text-secondary-900`}
            >
              {previewName}
            </h4>
            <span
              className={`${FONT_STYLES.caption} rounded bg-primary-50 px-1.5 py-0.5 font-semibold text-primary-600`}
            >
              {t("createProject.preview.newBadge")}
            </span>
          </div>
          <p className={`${FONT_STYLES.caption} mt-1 text-secondary-500`}>
            {t("createProject.preview.meta")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        {members.length > 0 ? (
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {members.slice(0, 3).map((member) =>
              member.avatarUrl ? (
                <img
                  key={member.id}
                  src={member.avatarUrl}
                  alt=""
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <span
                  key={member.id}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-primary-100 text-[10px] font-semibold text-primary-700"
                >
                  {getInitials(member.name)}
                </span>
              ),
            )}
          </div>
        ) : null}

        <button
          type="button"
          className={`${FONT_STYLES.caption} inline-flex items-center gap-1.5 rounded-lg border border-secondary-200 bg-white px-3 py-1.5 font-semibold text-secondary-600`}
        >
          <Eye size={14} strokeWidth={2} />
          {t("createProject.preview.button")}
        </button>
      </div>
    </div>
  );
};
