import React from "react";
import { format } from "date-fns";
import "./BookingSchedule.css";

export default function BookingSchedule({
  activeTab,
  activeRoom,
  onReserve,
  reservedSlots,
  selectedDate,
}) {
  const timeSlots = [
    "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
  ];

  const saunaRooms = ["sauna1", "sauna2"];
  const laundryMachines = [
    "washing-machine-1",
    "washing-machine-2",
    "washing-machine-3",
  ];
  const clubroom = ["clubroom"];

  const labelMap = {
    sauna1: "Sauna 1",
    sauna2: "Sauna 2",
    "washing-machine-1": "Washing Machine 1",
    "washing-machine-2": "Washing Machine 2",
    "washing-machine-3": "Washing Machine 3",
    clubroom: "Clubroom",
  };

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  const isReserved = (room, time) =>
    reservedSlots.some(
      (slot) => slot.room === room && slot.time === time && slot.date === dateKey
    );

  const renderGrid = (rooms) => (
    <div className="schedule-grid">
      {rooms.map((room) => (
        <div key={room} className="schedule-column">
          <h4>{labelMap[room]}</h4>
          <ul>
            {timeSlots.map((time) => {
              const reserved = isReserved(room, time);
              return (
                <li key={time}>
                  <span>{time}</span>
                  <button
                    disabled={reserved}
                    className={reserved ? "reserved" : "vacant"}
                    onClick={() => onReserve(time, room, selectedDate)}
                  >
                    {reserved ? "RESERVED" : "VACANT"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  const formattedDate = format(selectedDate, "EEEE, dd.MM.yyyy");

  return (
    <div className="booking-schedule">
      <p>{formattedDate}</p>
      {activeTab === "sauna" && renderGrid(saunaRooms)}
      {activeTab === "laundry" && renderGrid(laundryMachines)}
      {activeTab === "clubroom" && renderGrid(clubroom)}
    </div>
  );
}
