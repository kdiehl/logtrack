import React from "react";
import { useSettings } from "./SettingsContext";
import { Theme } from "./Theme";

const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useSettings();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };

  return (
    <div className="mb-4">
      <label htmlFor="theme-select" className="block mb-2">
        Theme
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleThemeChange}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
      >
        <option value={Theme.Light}>Light</option>
        <option value={Theme.Dark}>Dark</option>
      </select>
    </div>
  );
};

export default ThemeSettings;
