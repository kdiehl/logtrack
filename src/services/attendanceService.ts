import { db } from "../utils/db";

export const updateWorkplace = async (date: string, workplace?: string) => {
  const existingAttendance = await db.attendances.where({ date }).first();
  if (existingAttendance) {
    await db.attendances.update(existingAttendance.id!, { workplace });
  } else {
    await db.attendances.add({ date, workplace });
  }
};

export const updateAttendance = async (date: string, attendance?: string, workRequired?: boolean) => {
  const existingAttendance = await db.attendances.where({ date }).first();
  if (existingAttendance) {
    await db.attendances.update(existingAttendance.id!, { attendance });
  } else {
    await db.attendances.add({ date, attendance });
  }
  if (!workRequired) {
    await updateOvertime(date, 0);
  } else if (workRequired && (existingAttendance?.overtime === undefined || existingAttendance.overtime === 0)) {
    await updateOvertimeWithWorkedTime(0, date);
  }
};

const updateOvertime = async (date: string, overtime?: number) => {
  const existingAttendance = await db.attendances.where({ date }).first();
  if (existingAttendance) {
    await db.attendances.update(existingAttendance.id!, { overtime });
  } else {
    await db.attendances.add({ date, overtime });
  }
};

const calculateOvertime = async (workedTime: number, date: string) => {
  const dayOfWeek = new Date(date).toLocaleString('en-us', { weekday: 'long' });
  const settings = await db.settings.toArray();
  const mandatoryHours = settings[0]?.mandatoryHours?.[dayOfWeek] || 0;
  return workedTime - mandatoryHours;
};

export const updateOvertimeWithWorkedTime = async (workedTime: number, date: string) => {
  const overtime = await calculateOvertime(workedTime, date);
  await updateOvertime(date, overtime);
};
