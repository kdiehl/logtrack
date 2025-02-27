import React, { useState, useEffect } from "react";
import { useSettings } from "../settings/SettingsContext";
import { updateWorkplace, updateAttendance } from "../services/attendanceService";
import SelectInput from "../components/SelectInput";
import { db } from "../utils/db";

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
    await updateWorkplace(date, value);
  };

  const handleAttendanceChange = async (value: string | undefined) => {
    setAttendance(value);
    const selectedAttendance = attendances.find(att => att.label === value);
    await updateAttendance(date, value, selectedAttendance?.workRequired);
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
        options={attendances.map(att => att.label)}
        placeholder="Select Attendance"
        className={`${attendance ? '' : 'bg-red-200'}`}
      />
    </div>
  );
};

export default Attendance;
