import React, { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";
import TimelineElement from "./TimelineElement";
import TimelineControls from "./TimelineControls";
import { calculateCurrentTimePosition } from "./TimelineCalculator";

const Timeline: React.FC = () => {
  const bookings = useLiveQuery(() => db.bookings.toArray(), []);
  const tickets = useLiveQuery(() => db.tickets.toArray(), []);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);

  const HOUR_HEIGHT = 60;
  const START_HOUR = 5;
  const UPDATE_INTERVAL = 60000;

  const handleSegmentChange = (segment: string) => {
    if (segment === "Today") {
      setWeekOffset(0);
    } else if (segment === "Last Week") {
      setWeekOffset((prev) => prev - 1);
    } else if (segment === "Next Week") {
      setWeekOffset((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const updateCurrentTimePosition = () => {
      const position = calculateCurrentTimePosition(START_HOUR, HOUR_HEIGHT);
      setCurrentTimePosition(position);
    };

    updateCurrentTimePosition();
    const interval = setInterval(updateCurrentTimePosition, UPDATE_INTERVAL); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!bookings || !tickets) {
    return null;
  }

  const getWeekRange = (offset: number) => {
    const currentDay = new Date().getDay(); // Sunday - Saturday : 0 - 6
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - currentDay + 1 + offset * 7); // Set to Monday of the current week + offset
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Set to Sunday of the week
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek, currentDay };
  };

  const { startOfWeek, endOfWeek, currentDay } = getWeekRange(weekOffset);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <TimelineControls handleSegmentChange={handleSegmentChange} />
        <div className="text-gray-700 dark:text-gray-300">
          {`${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`}
        </div>
      </div>
      <div className="flex justify-between bg-gray-100 dark:bg-gray-500 text-center">
        <div className="grid grid-cols-[60px_repeat(6,_1fr)] w-full">
          <div></div>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
            <div key={day} className={index + 1 === currentDay ? "bg-blue-200 dark:bg-blue-500 p-2" : "p-2"}>
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-[60px_repeat(6,_1fr)] relative overflow-y-auto h-[1020px]">
        <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-[60px_repeat(6,_1fr)] grid-rows-[repeat(18,_60px)]">
          {Array.from({ length: 18 }, (_, i) => (
            <div key={i} className="border-t border-gray-300 relative pl-1 box-border col-span-7">
              {`${i + START_HOUR}:00`}
            </div>
          ))}
        </div>
        <div className="absolute left-0 right-0 h-0.5 bg-red-500 z-10" style={{ top: `${currentTimePosition}px` }}></div>
        {bookings
          .filter((booking) => {
            const bookingDate = new Date(booking.date);
            return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
          })
          .map((booking) => {
            const bookingDate = new Date(booking.date).getDay();
            const ticket = tickets.find((t) => t.id === booking.ticketId);
            return bookingDate !== 0 && ticket ? (
              <TimelineElement
                key={booking.id}
                booking={booking}
                ticket={ticket}
                hourHeight={HOUR_HEIGHT}
                startHour={START_HOUR}
                style={{
                  gridColumnStart: bookingDate + 1,
                  gridColumnEnd: bookingDate + 1,
                }}
              />
            ) : null;
          })}
      </div>
    </div>
  );
};

export default Timeline;
