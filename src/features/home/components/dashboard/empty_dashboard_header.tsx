import { Trans, useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { useAuth } from "../../../../hooks/use_auth";

export type EmptyDashboardHeaderProps = {
  sectionLabel: string;
  workspaceName: string;
  badgeLabel: string;
  subtitle: string;
};

export const EmptyDashboardHeader = ({
  sectionLabel,
  workspaceName,
  badgeLabel,
  subtitle,
}: EmptyDashboardHeaderProps) => {
  const { t } = useTranslation("dashboard");
  const { profile } = useAuth();

  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-secondary-500">
        <span className={`${FONT_STYLES.overline} text-[10px] font-bold tracking-widest text-secondary-400`}>
          {sectionLabel}
        </span>
        <span className="text-secondary-300" aria-hidden>
          /
        </span>
        <span className={`${FONT_STYLES.caption} font-medium tracking-wide text-secondary-600`}>
          {workspaceName}
        </span>
        <span className="inline-flex items-center rounded border border-primary-100 bg-primary-50 px-1.5 py-0.5 text-[10px] font-semibold text-primary-600">
          {badgeLabel}
        </span>
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-secondary-900 lg:text-4xl">
        <Trans
          t={t}
          i18nKey="empty.title"
          values={{ name: profile?.userName ?? "" }}
          components={{
            gradient: (
              <span
                className="bg-clip-text text-transparent "
                style={{ backgroundImage: "var(--gradient-primary-rose)" }}
              />
            ),
          }}
        />
      </h1>
      <p className={`${FONT_STYLES.bodySm} max-w-xl text-secondary-500`}>{subtitle}</p>
    </div>
  );
};
