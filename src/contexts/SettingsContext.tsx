// src/contexts/SettingsContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { db } from "../utils/db";
import { Theme } from "../settings/Theme";

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
  const [theme, setTheme] = useState<Theme>(Theme.Light);
  const [url, setUrl] = useState("");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await db.settings.toArray();
      if (settings.length > 0) {
        setTheme(settings[0].theme as Theme);
        setUrl(settings[0].url || "");
      }
    };
    loadSettings().catch(console.error);
  }, []);

  const handleSetTheme = async (theme: Theme) => {
    setTheme(theme);
    await db.settings.put({ id: 1, theme, url });
  };

  const handleSetUrl = async (url: string) => {
    setUrl(url);
    await db.settings.put({ id: 1, theme, url });
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
