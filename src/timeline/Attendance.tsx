import React, { useState, useEffect } from "react";
import { useSettings } from "../settings/SettingsContext";
import { db } from "../utils/db";
import SelectInput from "../components/SelectInput";

interface AttendanceProps {
  date: string; // ISO string format
}

const Attendance: React.FC<AttendanceProps> = ({ date }) => {
  const { workplaces, attendances } = useSettings();
  const [workplace, setWorkplace] = useState<string | undefined>(undefined);
  const [attendance, setAttendance] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadAttendance = async () => {
      const existingAttendance = await db.attendances.where({ date }).first();
      if (existingAttendance) {
        setWorkplace(existingAttendance.workplace);
        setAttendance(existingAttendance.attendance);
      }
    };
    loadAttendance();
  }, [date]);

  const handleWorkplaceChange = async (value: string | undefined) => {
    setWorkplace(value);
    const existingAttendance = await db.attendances.where({ date }).first();
    if (existingAttendance) {
      await db.attendances.update(existingAttendance.id!, { workplace: value });
    } else {
      await db.attendances.add({ date, workplace: value, attendance });
    }
  };

  const handleAttendanceChange = async (value: string | undefined) => {
    setAttendance(value);
    const existingAttendance = await db.attendances.where({ date }).first();
    if (existingAttendance) {
      await db.attendances.update(existingAttendance.id!, { attendance: value });
    } else {
      await db.attendances.add({ date, workplace, attendance: value });
    }
  };

  return (
    <div className="p-2">
      <SelectInput
        value={workplace}
        onChange={handleWorkplaceChange}
        options={workplaces}
        placeholder="Select Workplace"
        className={`mb-2 ${workplace ? '' : 'bg-red-200'}`}
      />
      <SelectInput
        value={attendance}
        onChange={handleAttendanceChange}
        options={attendances}
        placeholder="Select Attendance"
        className={`${attendance ? '' : 'bg-red-200'}`}
      />
    </div>
  );
};

export default Attendance;
