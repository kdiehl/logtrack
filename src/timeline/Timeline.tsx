import React, { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";
import "./Timeline.css";
import TimelineElement from "./TimelineElement";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Timeline: React.FC = () => {
  const bookings = useLiveQuery(() => db.bookings.toArray(), []);
  const tickets = useLiveQuery(() => db.tickets.toArray(), []);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);

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
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const position = (hours - 5) * 50 + (minutes / 60) * 50;
      setCurrentTimePosition(position);
    };

    updateCurrentTimePosition();
    const interval = setInterval(updateCurrentTimePosition, 60000); // Update every minute

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
        <div className="flex">
          <button
            className="px-4 py-2 mx-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            onClick={() => handleSegmentChange("Last Week")}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="px-4 py-2 mx-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            onClick={() => handleSegmentChange("Today")}
          >
            Today
          </button>
          <button
            className="px-4 py-2 mx-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            onClick={() => handleSegmentChange("Next Week")}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          {`${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`}
        </div>
      </div>
      <div className="flex justify-between bg-gray-100 dark:bg-gray-500 text-center">
        <div className="timeline-grid-header">
          <div className="timeline-hour-header"></div>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
            <div key={day} className={index + 1 === currentDay ? "bg-blue-200 dark:bg-blue-500 p-2" : "p-2"}>
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="timeline-body">
        <div className="timeline-grid">
          {Array.from({ length: 18 }, (_, i) => (
            <div key={i} className="timeline-hour">
              {`${i + 5}:00`}
            </div>
          ))}
        </div>
        <div className="current-time-line" style={{ top: `${currentTimePosition}px` }}></div>
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
