import React from "react";
import Headline from "../components/Headline";
import { useSettings } from "../settings/SettingsContext";
import { Theme } from "../settings/Theme";

const SettingsPage: React.FC = () => {
  const { theme, url, jiraAccessToken, setTheme, setUrl, setJiraAccessToken } =
    useSettings();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleJiraAccessTokenChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setJiraAccessToken(e.target.value);
  };

  return (
    <div className="p-4 w-full">
      <Headline preset="h2">Settings</Headline>
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
      <div className="mb-4">
        <label htmlFor="url-input" className="block mb-2">
          Ticket Base Url
        </label>
        <input
          id="url-input"
          type="text"
          value={url}
          onChange={handleUrlChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="jira-access-token-input" className="block mb-2">
          Jira Access Token
        </label>
        <input
          id="jira-access-token-input"
          type="text"
          value={jiraAccessToken}
          onChange={handleJiraAccessTokenChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
