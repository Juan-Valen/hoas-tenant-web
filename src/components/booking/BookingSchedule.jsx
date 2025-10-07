import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "./BookingSchedule.css";

export default function BookingSchedule({
    activeTab,
    activeRoom,
    onReserve,
    reservedSlots,
    selectedDate,
}) {
    const [reservables, setReservables] = useState(null);
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
    const url = "http://localhost:4000";
    const getMachines = async () => {

        const response = await fetch(url + "/api/reservations/reservables", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: activeTab }),
        });
        const reservableList = await response.json();
        setReservables(reservableList);
    }
    useEffect(() => {
        getMachines();
    }, [])
    useEffect(() => {
        getMachines();
    }, [activeTab])
    const clubroom = ["clubroom"];


    const dateKey = format(selectedDate, "yyyy-MM-dd");

    const isReserved = (room, time) =>
        reservedSlots.some(
            (slot) => slot.room === room && slot.time === time && slot.date === dateKey
        );

    const renderGrid = () => (
        <div className="schedule-grid">
            {reservables && reservables.map((res) => (
                <div key={res._id} className="schedule-column">
                    <h4>{activeTab + " " + (res.identifier ?? "")}</h4>
                    <ul>
                        {timeSlots.map((time) => {
                            const reserved = isReserved(res.identifier ?? "", time);
                            return (
                                <li key={time}>
                                    <span>{time}</span>
                                    <button
                                        disabled={reserved}
                                        className={reserved ? "reserved" : "vacant"}
                                        onClick={() => onReserve(time, res.identifier ?? "", selectedDate)}
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
