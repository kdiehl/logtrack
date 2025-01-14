import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useSettings } from "../settings/SettingsContext";
import { Theme } from "../settings/Theme";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useSettings();

  const toggleTheme = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <span className="sr-only">Toggle theme</span>
      <input
        type="checkbox"
        checked={theme === Theme.Dark}
        onChange={toggleTheme}
        className="sr-only"
      />
      <div className="relative">
        <div className="block bg-blue-300 dark:bg-gray-500 w-14 h-8 rounded-full"></div>
        <div className="absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform translate-x-6 bg-yellow-500 dark:bg-gray-500 dark:translate-x-0 text-white">
          {theme === Theme.Dark ? (
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
