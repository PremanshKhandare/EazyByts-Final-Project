import axios from "axios";
import { addMonths, eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Fetch events from the server
  useEffect(() => {
    axios.get("/events").then((response) => {
      setEvents(response.data);
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, []);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Create empty cells for alignment
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, index) => (
    <div key={`empty-${index}`} className="p-4 bg-gray-100"></div>
  ));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>
            <BsCaretLeftFill className="text-gray-600 hover:text-black text-2xl" />
          </button>
          <span className="text-2xl font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <BsFillCaretRightFill className="text-gray-600 hover:text-black text-2xl" />
          </button>
        </div>

        {/* Days of the Week */}
        <div className="grid grid-cols-7 text-center font-semibold bg-gray-200 p-2 rounded-t-lg">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-3 text-gray-700">{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border border-gray-300">
          {emptyCells.concat(
            daysInMonth.map((date) => (
              <div key={date.toISOString()} className="p-6 relative border border-gray-200 bg-white">
                <div className="font-bold text-lg">{format(date, "dd")}</div>
                <div className="absolute top-10">
                  {events
                    .filter((event) => format(new Date(event.eventDate), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
                    .map((event) => (
                      <Link key={event._id} to={"/event/" + event._id} className="block mt-2">
                        <div className="bg-blue-500 text-white rounded p-1 text-sm">
                          {event.title.toUpperCase()}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
