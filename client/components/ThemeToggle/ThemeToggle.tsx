import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import css from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;

    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className={css.toggleButton}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className={css.iconActive} />
      ) : (
        <Moon className={css.iconInactive} />
      )}
    </button>
  );
}
