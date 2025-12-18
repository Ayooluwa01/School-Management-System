"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // We import this, then override it below
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Mock Data
const events = [
  { date: "2025-01-10", title: "Staff Meeting", time: "10:00 AM" },
  { date: "2025-01-15", title: "Mid-Term Test", time: "All Day" },
  { date: "2025-01-20", title: "PTA Meeting", time: "4:00 PM" },
];

export default function TinyCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  const selectedDate =
    value instanceof Date ? value.toISOString().split("T")[0] : null;

  // Find events for the selected day
  const dayEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. The Calendar Card */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl  border-gray-100 dark:border-gray-700">
        
        {/* Custom CSS overrides for React-Calendar */}
        <style jsx global>{`
          .react-calendar {
            width: 100% !important;
            background: none !important;
            border: none !important;
            font-family: inherit;
          }
          
          /* Header Navigation */
          .react-calendar__navigation {
            display: flex;
            margin-bottom: 1rem;
          }
          .react-calendar__navigation button {
            min-width: 30px;
            background: none;
            font-size: 14px;
            font-weight: 600;
            color: #374151; /* gray-700 */
          }
          .dark .react-calendar__navigation button {
            color: #d1d5db; /* gray-300 */
          }
          .react-calendar__navigation button:enabled:hover,
          .react-calendar__navigation button:enabled:focus {
            background-color: #f3f4f6; /* gray-100 */
            border-radius: 8px;
          }
          .dark .react-calendar__navigation button:enabled:hover {
            background-color: #374151; /* gray-700 */
          }

          /* Days of Week (Mon, Tue...) */
          .react-calendar__month-view__weekdays {
            text-transform: uppercase;
            font-size: 0.75rem;
            font-weight: 600;
            color: #9ca3af; /* gray-400 */
            text-decoration: none !important; 
          }
          .react-calendar__month-view__weekdays__weekday abbr {
             text-decoration: none;
          }

          /* Tiles (The actual days) */
          .react-calendar__tile {
            padding: 10px 6px;
            font-size: 0.875rem;
            color: #4b5563; /* gray-600 */
            border-radius: 8px;
            transition: all 0.2s;
            position: relative;
          }
          .dark .react-calendar__tile {
            color: #9ca3af; /* gray-400 */
          }
          
          /* Hover state */
          .react-calendar__tile:enabled:hover,
          .react-calendar__tile:enabled:focus {
            background-color: #f3f4f6;
            color: #111827;
          }
          .dark .react-calendar__tile:enabled:hover {
            background-color: #374151;
            color: #fff;
          }

          /* "Today" styling */
          .react-calendar__tile--now {
            background: #eff6ff !important; /* blue-50 */
            color: #2563eb !important; /* blue-600 */
            font-weight: bold;
          }
          .dark .react-calendar__tile--now {
             background: #1e3a8a !important; /* blue-900 */
             color: #60a5fa !important; /* blue-400 */
          }

          /* "Selected" styling (Overrides Today) */
          .react-calendar__tile--active {
            background: #7c3aed !important; /* purple-600 */
            color: white !important;
            box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.3);
          }
          .react-calendar__tile--active:enabled:hover,
          .react-calendar__tile--active:enabled:focus {
            background: #6d28d9 !important; /* purple-700 */
          }
        `}</style>

        <Calendar
          onChange={onChange}
          value={value}
          locale="en-US"
          next2Label={null} // Hide the double arrow (>>)
          prev2Label={null} // Hide the double arrow (<<)
          prevLabel={<ChevronLeft className="w-4 h-4" />}
          nextLabel={<ChevronRight className="w-4 h-4" />}
          showNeighboringMonth={false} // Clean look
          minDetail="year" // Disallow zooming out too far
          
          // Logic for the Dot Indicator
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const dateString = date.toISOString().split("T")[0];
              // Check if this date is in our events array
              if (events.some((e) => e.date === dateString)) {
                return "has-event"; 
              }
            }
            return null;
          }}
          
          // Render the actual dot inside the tile
          tileContent={({ date, view }) => {
            if (view === "month") {
              const dateString = date.toISOString().split("T")[0];
              if (events.some((e) => e.date === dateString)) {
                return (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full" />
                  </div>
                );
              }
            }
            return null;
          }}
        />
      </div>

      {/* 2. The Events List (Agenda) */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl  border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Events for {value instanceof Date ? value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Selected Date'}
          </h3>
          <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>

        <div className="flex flex-col gap-3">
          {dayEvents.length > 0 ? (
            dayEvents.map((event, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border-l-4 border-purple-500 bg-gray-50 dark:bg-gray-700/50 flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                   <h4 className="text-xs font-bold text-gray-800 dark:text-gray-100">
                     {event.title}
                   </h4>
                   <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
                     {event.time}
                   </span>
                </div>
                <p className="text-[10px] text-gray-400">
                   Lorem ipsum dolor sit amet.
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
               <p className="text-xs text-gray-400">No events scheduled.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}