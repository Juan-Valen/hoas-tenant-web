import React from "react";
import { format, addDays, subDays, isSameDay, isBefore } from "date-fns";
import { FaCalendarAlt, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./CalendarHeader.css";

export default function CalendarHeader({ selectedDate, setSelectedDate }) {
  const formatted = format(selectedDate, "EEEE dd/MM/yyyy");
  const today = new Date();

  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const handlePrevDay = () => {
    if (!isBefore(selectedDate, today) && !isSameDay(selectedDate, today)) {
      setSelectedDate(subDays(selectedDate, 1));
    }
  };

  const isAtToday = isSameDay(selectedDate, today);

  return (
    <div className="calendar-header">
      <FaChevronLeft
        className={`calendar-arrow ${isAtToday ? "disabled" : ""}`}
        onClick={handlePrevDay}
      />
      <FaCalendarAlt className="calendar-icon" />
      <span className="calendar-date">{formatted}</span>
      <FaChevronRight className="calendar-arrow" onClick={handleNextDay} />
    </div>
  );
}
