import React, { useState } from "react";
import SegmentControls, { Segment } from "../components/SegmentControls";
import Headline from "../components/Headline";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";
import { Booking } from "../journal/Booking";

const Reports: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const bookings = useLiveQuery(() => db.bookings.toArray(), []);
  const attendances = useLiveQuery(() => db.attendances.toArray(), []);

  const handleSegmentChange = (segment: Segment) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (segment === Segment.Back) {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (segment === Segment.Next) {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (segment === Segment.Now) {
        newDate.setMonth(new Date().getMonth());
        newDate.setFullYear(new Date().getFullYear());
      }
      return newDate;
    });
  };

  const getCurrentMonthName = () => {
    return currentDate.toLocaleString('default', { month: 'long' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayName = (date: Date) => {
    return date.toLocaleString('default', { weekday: 'long' });
  };

  const calculateWorkedTime = (bookings: Booking[]) => {
    let totalMinutes = 0;
    bookings.forEach((booking) => {
      const start = new Date(booking.startTime).getTime();
      const end = booking.endTime ? new Date(booking.endTime).getTime() : start;
      totalMinutes += (end - start) / 60000;
    });
    return (totalMinutes / 60).toFixed(2) + 'h';
  };

  const calculateBreakTime = (bookings: Booking[]) => {
    let totalBreakMinutes = 0;
    for (let i = 1; i < bookings.length; i++) {
      const prevEnd = new Date(bookings[i - 1].endTime || bookings[i - 1].startTime).getTime();
      const currentStart = new Date(bookings[i].startTime).getTime();
      totalBreakMinutes += (currentStart - prevEnd) / 60000;
    }
    return totalBreakMinutes + ' min';
  };

  const calculateTotalOvertime = () => {
    const currentMonthOvertime = attendances?.reduce((sum, attendance) => {
      const date = new Date(attendance.date);
      if (date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
        return sum + (attendance.overtime || 0);
      }
      return sum;
    }, 0) || 0;

    const previousMonthsOvertime = attendances?.reduce((sum, attendance) => {
      const date = new Date(attendance.date);
      if (date < new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)) {
        return sum + (attendance.overtime || 0);
      }
      return sum;
    }, 0) || 0;

    return {
      currentMonth: currentMonthOvertime.toFixed(2) + 'h',
      total: (currentMonthOvertime + previousMonthsOvertime).toFixed(2) + 'h'
    };
  };

  const calculateAttendanceSummary = () => {
    const summary: { [key: string]: number } = {};
    attendances?.forEach((attendance) => {
      const date = new Date(attendance.date);
      if (date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear() && attendance.attendance) {
        summary[attendance.attendance] = (summary[attendance.attendance] || 0) + 1;
      }
    });
    return summary;
  };

  const calculateOvertime = (dayAttendance: import("/workspaces/logtrack/src/utils/db").Attendance | undefined) => {
    return dayAttendance?.overtime !== undefined ? dayAttendance.overtime.toFixed(2) + 'h' : '-';
  };

  const renderRows = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const rows = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayBookings = bookings?.filter(
        (booking) => new Date(booking.date).toDateString() === date.toDateString()
      ) || [];
      const dayAttendance = attendances?.find(
        (attendance) => new Date(attendance.date).toDateString() === date.toDateString()
      );
      const firstBooking = dayBookings[0];
      const lastBooking = dayBookings[dayBookings.length - 1];
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      rows.push(
        <tr key={day} className={isWeekend ? "bg-gray-200 dark:bg-gray-600" : ""}>
          <td>{date.toLocaleDateString()}</td>
          <td>{getDayName(date)}</td>
          <td>{firstBooking ? new Date(firstBooking.startTime).toLocaleTimeString() : '-'}</td>
          <td>{lastBooking && lastBooking.endTime ? new Date(lastBooking.endTime).toLocaleTimeString() : '-'}</td>
          <td>{dayAttendance?.workplace ? dayAttendance.workplace : '-'}</td>
          <td>{dayAttendance?.attendance ? dayAttendance.attendance : '-'}</td>
          <td className="text-right w-24">{calculateBreakTime(dayBookings)}</td>
          <td className="text-right w-24">{calculateWorkedTime(dayBookings)}</td>
          <td className="text-right w-24">{calculateOvertime(dayAttendance)}</td>
        </tr>
      );
    }
    return rows;
  };

  const totalOvertime = calculateTotalOvertime();
  const attendanceSummary = calculateAttendanceSummary();

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <SegmentControls handleSegmentChange={handleSegmentChange} todayLabel="Today" />
        </div>
        <Headline preset="h2">
          {getCurrentMonthName()}
        </Headline>
        <div></div>
      </div>
      <div className="w-1/2 mx-auto">
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {Object.entries(attendanceSummary).map(([type, count]) => (
                <div key={type} className="text-center">
                  <div className="font-semibold">{type}</div>
                  <div>{count}</div>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="font-semibold">Current Month Overtime</div>
                <div>{totalOvertime.currentMonth}</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">Total Overtime</div>
                <div>{totalOvertime.total}</div>
              </div>
            </div>
          </div>
        </div>
        <table className="min-w-full bg-white dark:bg-gray-700">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Day</th>
              <th className="py-2">First Start</th>
              <th className="py-2">Last End</th>
              <th className="py-2">Workplace</th>
              <th className="py-2">Attendance</th>
              <th className="py-2 text-right w-24">Break Duration</th>
              <th className="py-2 text-right w-24">Worked Time</th>
              <th className="py-2 text-right w-24">Overtime</th>
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
