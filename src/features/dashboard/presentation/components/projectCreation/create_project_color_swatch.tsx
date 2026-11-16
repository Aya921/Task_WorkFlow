import { Check } from "lucide-react";

type CreateProjectColorSwatchProps = {
  name: string;
  color: string;
  isSelected: boolean;
  onSelect: () => void;
};

export const CreateProjectColorSwatch = ({
  name,
  color,
  isSelected,
  onSelect,
}: CreateProjectColorSwatchProps) => {
  return (
    <button
      type="button"
      aria-label={name}
      aria-pressed={isSelected}
      onClick={onSelect}
      style={{ backgroundColor: color }}
      className={`flex h-7 w-7 items-center justify-center rounded-full ${
        isSelected ? "ring-2 ring-secondary-900 ring-offset-1" : ""
      }`}
    >
      {isSelected ? (
        <Check size={12} strokeWidth={3} className="text-white" />
      ) : null}
    </button>
  );
};
