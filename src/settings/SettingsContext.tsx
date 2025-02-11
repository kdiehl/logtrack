import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { db } from "../utils/db";
import { Theme } from "./Theme";
import { useLiveQuery } from "dexie-react-hooks";

interface SettingsContextProps {
  theme: Theme;
  url: string;
  workplaces: string[];
  attendances: string[];
  setTheme: (theme: Theme) => void;
  setUrl: (url: string) => void;
  setWorkplaces: (workplaces: string[]) => void;
  setAttendances: (attendances: string[]) => void;
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
  const workplaces = settings?.[0]?.workplaces ?? ["Home", "Office"];
  const attendances = settings?.[0]?.attendances ?? ["Worked", "Holiday", "Sick", "Sick for Children"];

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleSetTheme = useCallback(
    async (newTheme: Theme) => {
      await db.settings.put({ id: 1, theme: newTheme, url, workplaces, attendances });
    },
    [url, workplaces, attendances],
  );

  const handleSetUrl = useCallback(
    async (newUrl: string) => {
      await db.settings.put({ id: 1, theme, url: newUrl, workplaces, attendances });
    },
    [theme, workplaces, attendances],
  );

  const handleSetWorkplaces = useCallback(
    async (newWorkplaces: string[]) => {
      await db.settings.put({ id: 1, theme, url, workplaces: newWorkplaces, attendances });
    },
    [theme, url, attendances],
  );

  const handleSetAttendances = useCallback(
    async (newAttendances: string[]) => {
      await db.settings.put({ id: 1, theme, url, workplaces, attendances: newAttendances });
    },
    [theme, url, workplaces],
  );

  const contextValue = useMemo(
    () => ({
      theme,
      url,
      workplaces,
      attendances,
      setTheme: handleSetTheme,
      setUrl: handleSetUrl,
      setWorkplaces: handleSetWorkplaces,
      setAttendances: handleSetAttendances,
    }),
    [theme, url, workplaces, attendances, handleSetTheme, handleSetUrl, handleSetWorkplaces, handleSetAttendances],
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
