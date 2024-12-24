// src/components/ThemeToggle.tsx
import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useSettings } from "../contexts/SettingsContext";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useSettings();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="sr-only"
      />
      <div className="relative">
        <div className="block bg-blue-300 dark:bg-gray-500 w-14 h-8 rounded-full"></div>
        <div className="absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform translate-x-6 bg-yellow-500 dark:bg-gray-500 dark:translate-x-0 text-white">
          {theme === "dark" ? (
            <MoonIcon className="w-6 h-6" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </div>
      </div>
    </label>
  );
};

export default ThemeToggle;
