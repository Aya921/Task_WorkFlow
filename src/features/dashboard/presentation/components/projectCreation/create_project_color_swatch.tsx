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
      className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10 ${
        isSelected ? "ring-2 ring-secondary-900 ring-offset-2" : ""
      }`}
    >
      {isSelected ? (
        <Check size={16} strokeWidth={3} className="text-white" />
      ) : null}
    </button>
  );
};
