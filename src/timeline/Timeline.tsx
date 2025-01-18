import React, { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";
import "./Timeline.css";
import TimelineElement from "./TimelineElement";

const Timeline: React.FC = () => {
  const bookings = useLiveQuery(() => db.bookings.toArray(), []);
  const tickets = useLiveQuery(() => db.tickets.toArray(), []);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);

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

  const currentDay = new Date().getDay(); // Sunday - Saturday : 0 - 6

  return (
    <div className="flex flex-col h-full">
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
        {bookings.map((booking) => {
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
