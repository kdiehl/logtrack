// src/contexts/SettingsContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../utils/db";

interface SettingsContextProps {
  theme: string;
  url: string;
  setTheme: (theme: string) => void;
  setUrl: (url: string) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined,
);

function applyTheme(theme: string) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("light");
  const [url, setUrl] = useState("");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await db.settings.toArray();
      if (settings.length > 0) {
        setTheme(settings[0].theme);
        setUrl(settings[0].url || "");
      }
    };
    loadSettings().catch(console.error);
  }, []);

  const handleSetTheme = async (theme: string) => {
    setTheme(theme);
    await db.settings.put({ id: 1, theme, url });
  };

  const handleSetUrl = async (url: string) => {
    setUrl(url);
    await db.settings.put({ id: 1, theme, url });
  };

  return (
    <SettingsContext.Provider
      value={{ theme, url, setTheme: handleSetTheme, setUrl: handleSetUrl }}
    >
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
