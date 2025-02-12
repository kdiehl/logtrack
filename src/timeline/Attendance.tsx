import React, { useState, useEffect } from "react";
import { useSettings } from "../settings/SettingsContext";
import { db } from "../utils/db";

interface AttendanceProps {
  date: string; // ISO string format
}

const Attendance: React.FC<AttendanceProps> = ({ date }) => {
  const { workplaces, attendances } = useSettings();
  const [workplace, setWorkplace] = useState("");
  const [attendance, setAttendance] = useState("");

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

  const handleWorkplaceChange = async (value: string) => {
    setWorkplace(value);
    const existingAttendance = await db.attendances.where({ date }).first();
    if (existingAttendance) {
      await db.attendances.update(existingAttendance.id!, { workplace: value });
    } else {
      await db.attendances.add({ date, workplace: value, attendance });
    }
  };

  const handleAttendanceChange = async (value: string) => {
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
      <select
        value={workplace}
        onChange={(e) => handleWorkplaceChange(e.target.value)}
        className="mb-2"
      >
        {workplaces.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        value={attendance}
        onChange={(e) => handleAttendanceChange(e.target.value)}
      >
        {attendances.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Attendance;
