import React, { useState } from "react";
import SegmentControls, { Segment } from "../components/SegmentControls";
import Headline from "../components/Headline";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";
import { Booking } from "../journal/Booking";

const Reports: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const bookings = useLiveQuery(() => db.bookings.toArray(), []);

  const handleSegmentChange = (segment: Segment) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (segment === Segment.Back) {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (segment === Segment.Next) {
        newDate.setMonth(newDate.getMonth() + 1);
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
    return (totalMinutes / 60).toFixed(1) + 'h';
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

  const renderRows = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const rows = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayBookings = bookings?.filter(
        (booking) => new Date(booking.date).toDateString() === date.toDateString()
      ) || [];
      const firstBooking = dayBookings[0];
      const lastBooking = dayBookings[dayBookings.length - 1];
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      rows.push(
        <tr key={day} className={isWeekend ? "bg-gray-200 dark:bg-gray-600" : ""}>
          <td>{date.toLocaleDateString()}</td>
          <td>{getDayName(date)}</td>
          <td>{firstBooking ? new Date(firstBooking.startTime).toLocaleTimeString() : '-'}</td>
          <td>{lastBooking && lastBooking.endTime ? new Date(lastBooking.endTime).toLocaleTimeString() : '-'}</td>
          <td className="text-right w-24">{calculateBreakTime(dayBookings)}</td>
          <td className="text-right w-24">{calculateWorkedTime(dayBookings)}</td>
        </tr>
      );
    }
    return rows;
  };

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
        <table className="min-w-full bg-white dark:bg-gray-700">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Day</th>
              <th className="py-2">First Start</th>
              <th className="py-2">Last End</th>
              <th className="py-2 text-right w-24">Break Duration</th>
              <th className="py-2 text-right w-24">Worked Time</th>
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
