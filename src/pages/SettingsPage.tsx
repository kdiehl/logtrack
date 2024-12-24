// src/pages/SettingsPage.tsx
import React from "react";
import Headline from "../components/Headline";
import { useSettings } from "../contexts/SettingsContext";

const SettingsPage: React.FC = () => {
  const { theme, url, setTheme, setUrl } = useSettings();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="p-4 w-full">
      <Headline preset="h2">Settings</Headline>
      <div className="mb-4">
        <label className="block mb-2">Theme</label>
        <select
          value={theme}
          onChange={handleThemeChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Ticket Base Url</label>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
