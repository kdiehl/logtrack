import React, { createContext, useContext, useMemo, useEffect } from "react";
import { db } from "../utils/db";
import { Theme } from "./Theme";
import { useLiveQuery } from "dexie-react-hooks";

interface SettingsContextProps {
  theme: Theme;
  url: string;
  setTheme: (theme: Theme) => void;
  setUrl: (url: string) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined,
);

function applyTheme(theme: Theme) {
  if (theme === Theme.Dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const settings = useLiveQuery(() => db.settings.toArray(), []);

  const theme = settings?.[0]?.theme ?? Theme.Light;
  const url = settings?.[0]?.url ?? "";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleSetTheme = async (newTheme: Theme) => {
    await db.settings.put({ id: 1, theme: newTheme, url });
  };

  const handleSetUrl = async (newUrl: string) => {
    await db.settings.put({ id: 1, theme, url: newUrl });
  };

  const contextValue = useMemo(
    () => ({ theme, url, setTheme: handleSetTheme, setUrl: handleSetUrl }),
    [theme, url],
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
