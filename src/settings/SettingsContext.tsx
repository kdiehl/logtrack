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
  timelineDayTypes: string[];
  timelineWorkStatuses: string[];
  setTheme: (theme: Theme) => void;
  setUrl: (url: string) => void;
  setTimelineDayTypes: (dayTypes: string[]) => void;
  setTimelineWorkStatuses: (workStatuses: string[]) => void;
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
  const timelineDayTypes = settings?.[0]?.timelineDayTypes ?? ["Home", "Office"];
  const timelineWorkStatuses = settings?.[0]?.timelineWorkStatuses ?? ["Worked", "Holiday", "Sick", "Sick for Children"];

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleSetTheme = useCallback(
    async (newTheme: Theme) => {
      await db.settings.put({ id: 1, theme: newTheme, url, timelineDayTypes, timelineWorkStatuses });
    },
    [url, timelineDayTypes, timelineWorkStatuses],
  );

  const handleSetUrl = useCallback(
    async (newUrl: string) => {
      await db.settings.put({ id: 1, theme, url: newUrl, timelineDayTypes, timelineWorkStatuses });
    },
    [theme, timelineDayTypes, timelineWorkStatuses],
  );

  const handleSetTimelineDayTypes = useCallback(
    async (newDayTypes: string[]) => {
      await db.settings.put({ id: 1, theme, url, timelineDayTypes: newDayTypes, timelineWorkStatuses });
    },
    [theme, url, timelineWorkStatuses],
  );

  const handleSetTimelineWorkStatuses = useCallback(
    async (newWorkStatuses: string[]) => {
      await db.settings.put({ id: 1, theme, url, timelineDayTypes, timelineWorkStatuses: newWorkStatuses });
    },
    [theme, url, timelineDayTypes],
  );

  const contextValue = useMemo(
    () => ({
      theme,
      url,
      timelineDayTypes,
      timelineWorkStatuses,
      setTheme: handleSetTheme,
      setUrl: handleSetUrl,
      setTimelineDayTypes: handleSetTimelineDayTypes,
      setTimelineWorkStatuses: handleSetTimelineWorkStatuses,
    }),
    [theme, url, timelineDayTypes, timelineWorkStatuses, handleSetTheme, handleSetUrl, handleSetTimelineDayTypes, handleSetTimelineWorkStatuses],
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
