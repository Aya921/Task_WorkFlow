import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/use_theme";
import { Button } from "./button";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      wrapperClassName="contents"
      className="fixed right-5 top-5 z-[1000] h-11 w-11 rounded-2xl border shadow-lg shadow-secondary-900/10 backdrop-blur-md hover:-translate-y-0.5"
      activeClassName="border-secondary-200 bg-white/80 text-secondary-700 hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:bg-secondary-800/80 dark:text-secondary-100 dark:hover:border-accent-400 dark:hover:text-accent-300"
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden />
      ) : (
        <Moon className="h-5 w-5" aria-hidden />
      )}
    </Button>
  );
};
