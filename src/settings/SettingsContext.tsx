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

interface AttendanceOption {
  label: string;
  workRequired: boolean;
}

interface SettingsContextProps {
  theme: Theme;
  url: string;
  workplaces: string[];
  attendances: AttendanceOption[];
  mandatoryHours: { [day: string]: number };
  setTheme: (theme: Theme) => void;
  setUrl: (url: string) => void;
  setWorkplaces: (workplaces: string[]) => void;
  setAttendances: (attendances: AttendanceOption[]) => void;
  setMandatoryHours: (mandatoryHours: { [day: string]: number }) => void;
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
  const attendances = settings?.[0]?.attendances ?? [
    { label: "Worked", workRequired: true },
    { label: "Holiday", workRequired: false },
    { label: "Sick", workRequired: false },
    { label: "Sick for Children", workRequired: false },
  ];
  const mandatoryHours = settings?.[0]?.mandatoryHours ?? {
    Monday: 8,
    Tuesday: 8,
    Wednesday: 8,
    Thursday: 8,
    Friday: 8,
    Saturday: 0,
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleSetTheme = useCallback(
    async (newTheme: Theme) => {
      await db.settings.put({ id: 1, theme: newTheme, url, workplaces, attendances, mandatoryHours });
    },
    [url, workplaces, attendances, mandatoryHours],
  );

  const handleSetUrl = useCallback(
    async (newUrl: string) => {
      await db.settings.put({ id: 1, theme, url: newUrl, workplaces, attendances, mandatoryHours });
    },
    [theme, workplaces, attendances, mandatoryHours],
  );

  const handleSetWorkplaces = useCallback(
    async (newWorkplaces: string[]) => {
      await db.settings.put({ id: 1, theme, url, workplaces: newWorkplaces, attendances, mandatoryHours });
    },
    [theme, url, attendances, mandatoryHours],
  );

  const handleSetAttendances = useCallback(
    async (newAttendances: AttendanceOption[]) => {
      await db.settings.put({ id: 1, theme, url, workplaces, attendances: newAttendances, mandatoryHours });
    },
    [theme, url, workplaces, mandatoryHours],
  );

  const handleSetMandatoryHours = useCallback(
    async (newMandatoryHours: { [day: string]: number }) => {
      await db.settings.put({ id: 1, theme, url, workplaces, attendances, mandatoryHours: newMandatoryHours });
    },
    [theme, url, workplaces, attendances],
  );

  const contextValue = useMemo(
    () => ({
      theme,
      url,
      workplaces,
      attendances,
      mandatoryHours,
      setTheme: handleSetTheme,
      setUrl: handleSetUrl,
      setWorkplaces: handleSetWorkplaces,
      setAttendances: handleSetAttendances,
      setMandatoryHours: handleSetMandatoryHours,
    }),
    [theme, url, workplaces, attendances, mandatoryHours, handleSetTheme, handleSetUrl, handleSetWorkplaces, handleSetAttendances, handleSetMandatoryHours],
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
