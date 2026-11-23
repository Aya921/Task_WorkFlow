import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { getInitials } from "../../utils/get_initials";
import type { WorkspaceMember } from "../../../domain/entity/workspace_member";

type CreateProjectPreviewProps = {
  name: string;
  color: string;
  members: WorkspaceMember[];
  externalMembers: string[];
};

export const CreateProjectPreview = ({
  name,
  color,
  members,
  externalMembers,
}: CreateProjectPreviewProps) => {
  const { t } = useTranslation("dashboard");
  const previewName = name.trim() || t("createProject.preview.untitled");

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-secondary-200 bg-secondary-50/70 p-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <div className="flex min-w-0 items-start gap-2">
        <span
          className="mt-1 size-2 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <h4
              className={`${FONT_STYLES.caption} truncate font-semibold text-secondary-900`}
            >
              {previewName}
            </h4>
            <span className="rounded bg-primary-50 px-1 py-0.5 text-[10px] font-semibold text-primary-600">
              {t("createProject.preview.newBadge")}
            </span>
          </div>
          <p className={`${FONT_STYLES.caption} mt-0.5 text-secondary-500`}>
            {t("createProject.preview.meta")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        {members.length > 0? (
          <div className="flex -space-x-1.5 rtl:space-x-reverse">
            {members.slice(0, 3).map((member) => (
              <span
                key={member.fullName}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-primary-100 text-[8px] font-semibold text-primary-700"
              >
                {getInitials(member.fullName)}
              </span>
            ))}
            
          </div>
        ) : null}

        {externalMembers.length > 0? (
          <div className="flex -space-x-1.5 rtl:space-x-reverse">
            {externalMembers.slice(0, 3).map((email) => (
              <span key={email} className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-primary-100 text-[8px] font-semibold text-primary-700">
                {getInitials(email)}
              </span>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          className={`${FONT_STYLES.caption} inline-flex items-center gap-1 rounded-md border border-secondary-200 bg-white px-2 py-1 font-semibold text-secondary-600`}
        >
          <Eye size={12} strokeWidth={2} />
          {t("createProject.preview.button")}
        </button>
      </div>
    </div>
  );
};
