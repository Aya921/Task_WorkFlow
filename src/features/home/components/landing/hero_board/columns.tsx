import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";
import { LandingHeroTaskCard } from "./task_card";

export const LandingHeroBoardColumns = () => {
  const { t } = useTranslation("landing");

  return (
    <div className="grid grid-cols-1 gap-5 bg-secondary-50/80 p-4 sm:p-6 md:grid-cols-3">
      <div className="flex flex-col gap-3 rounded-xl border border-secondary-200/60 bg-secondary-100/70 p-3.5">
        <ColumnHeader
          dot="bg-secondary-400"
          title={t("hero.colTodo")}
          count="3"
        />
        <LandingHeroTaskCard
          priority={t("hero.priorityLow")}
          priorityTone="low"
          meta={t("hero.id102")}
          title={t("hero.taskNav")}
          date={t("hero.dateOct29")}
          assignee="TL"
        />
        <LandingHeroTaskCard
          priority={t("hero.priorityMedium")}
          priorityTone="medium"
          meta={t("hero.id105")}
          title={t("hero.taskInterview")}
          date={t("hero.dateTomorrow")}
          assignee="SJ"
          assigneeTone="primary"
        />
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-secondary-200/60 bg-secondary-100/70 p-3.5">
        <ColumnHeader
          dot="bg-amber-500"
          title={t("hero.colProgress")}
          count="2"
        />
        <LandingHeroTaskCard
          priority={t("hero.priorityHigh")}
          priorityTone="high"
          meta={t("hero.moving")}
          title={t("hero.taskContrast")}
          date={t("hero.dateOverdue")}
          assignee="SJ"
          assigneeTone="solid"
          variant="dragging"
          progress={65}
          dateTone="overdue"
        />
        <div className="rounded-xl border-2 border-dashed border-primary-300 bg-primary-50/50 p-3 text-center">
          <span className={`${FONT_STYLES.caption} font-medium text-primary-700`}>
            {t("hero.dropHere")}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-secondary-200/60 bg-secondary-100/70 p-3.5">
        <ColumnHeader
          dot="bg-emerald-500"
          title={t("hero.colDone")}
          count="2"
        />
        <LandingHeroTaskCard
          priority={t("hero.priorityComplete")}
          priorityTone="complete"
          meta={t("hero.id88")}
          title={t("hero.taskFigma")}
          date={t("hero.dateFinished22")}
          assignee="AK"
          assigneeTone="emerald"
          variant="done"
          dateTone="done"
        />
        <LandingHeroTaskCard
          priority={t("hero.priorityComplete")}
          priorityTone="complete"
          meta={t("hero.id91")}
          title={t("hero.taskHooks")}
          date={t("hero.dateFinished21")}
          assignee="TL"
          variant="done"
          dateTone="done"
        />
      </div>
    </div>
  );
};

const ColumnHeader = ({
  dot,
  title,
  count,
}: {
  dot: string;
  title: string;
  count: string;
}) => (
  <div className="flex items-center justify-between px-1">
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      <span
        className={`${FONT_STYLES.caption} font-bold tracking-wider text-secondary-700 uppercase`}
      >
        {title}
      </span>
      <span
        className={`${FONT_STYLES.caption} rounded-full border border-secondary-200 bg-white px-1.5 py-0.5 font-semibold text-secondary-400`}
      >
        {count}
      </span>
    </div>
    <Button
      type="button"
      wrapperClassName="inline-flex"
      className={`${FONT_STYLES.caption} p-0`}
      activeClassName="border-transparent bg-transparent font-medium text-secondary-400 hover:text-secondary-600"
    >
      +
    </Button>
  </div>
);
