export type ProjectColorOption = {
  id: string;
  color: string;
};

export const PROJECT_COLORS: ProjectColorOption[] = [
  { id: "red", color: "#D5554C" },
  { id: "orange", color: "#E27B36" },
  { id: "burntOrange", color: "#D1622B" },
  { id: "amber", color: "#E2A13D" },
  { id: "gold", color: "#DCB540" },
  { id: "lime", color: "#96C843" },
  { id: "green", color: "#68C06A" },
  { id: "mint", color: "#5FB586" },
  { id: "teal", color: "#62B4A6" },
  { id: "sky", color: "#60B4D0" },
  { id: "skyBlue", color: "#5BA5E4" },
  { id: "royal", color: "#4567E2" },
  { id: "indigo", color: "#6B6DE8" },
  { id: "purple", color: "#8565EC" },
  { id: "pink", color: "#D45A97" },
  { id: "rose", color: "#D95261" },
  { id: "brown", color: "#794F1F" },
  { id: "slate", color: "#4C5467" },
];

export const DEFAULT_PROJECT_COLOR =
  PROJECT_COLORS.find((color) => color.id === "skyBlue") ?? PROJECT_COLORS[0];
