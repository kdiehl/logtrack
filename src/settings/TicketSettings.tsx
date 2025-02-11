import React from "react";
import { useSettings } from "./SettingsContext";

const TicketSettings: React.FC = () => {
  const { url, setUrl } = useSettings();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
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
  );
};

export default TicketSettings;
