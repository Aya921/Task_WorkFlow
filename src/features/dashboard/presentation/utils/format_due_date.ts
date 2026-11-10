export type DueDateTone = "default" | "urgent" | "soon";

export type FormattedDueDate = {
  label: string;
  tone: DueDateTone;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const formatDueDate = (
  value: string | null,
  locale: string,
  labels: {
    today: string;
    tomorrow: string;
  },
): FormattedDueDate | null => {
  if (!value) {
    return null;
  }

  const dueDate = new Date(value);
  if (Number.isNaN(dueDate.getTime())) {
    return null;
  }

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const timeLabel = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
  }).format(dueDate);

  if (isSameDay(dueDate, now)) {
    return {
      label: `${labels.today}, ${timeLabel}`,
      tone: "urgent",
    };
  }

  if (isSameDay(dueDate, tomorrow)) {
    return {
      label: labels.tomorrow,
      tone: "soon",
    };
  }

  return {
    label: new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
    }).format(dueDate),
    tone: "default",
  };
};
