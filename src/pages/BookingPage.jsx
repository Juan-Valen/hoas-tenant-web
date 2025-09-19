import React, { useState } from "react";
import BookingTabs from "../components/booking/BookingTabs";
import RoomSelector from "../components/booking/RoomSelector";
import UserReservations from "../components/booking/UserReservations";
import BookingInstructions from "../components/booking/BookingInstructions";
import BookingSchedule from "../components/booking/BookingSchedule";
import CalendarHeader from "../components/booking/CalendarHeader";
import { format } from "date-fns";
import Footer from "../components/Footer"; // adjust path if needed
import "./BookingPage.css";

export default function BookingPage() {
    const [activeTab, setActiveTab] = useState("sauna");
    const [activeRoom, setActiveRoom] = useState("sauna1");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reservations, setReservations] = useState([
        {
            id: 1,
            day: "Monday",
            time: "18:00 - 20:00",
            location: "Sauna 1, Staircase D",
            description: "Leikkisaurus for men",
        },
    ]);
    const [reservedSlots, setReservedSlots] = useState([]);

    const labelMap = {
        sauna1: "Sauna 1, Staircase D",
        sauna2: "Sauna 2, Staircase E",
        "washing-machine-1": "Washing Machine 1, Staircase D",
        "washing-machine-2": "Washing Machine 2, Staircase D",
        "washing-machine-3": "Washing Machine 3, Staircase D",
        "washing-machine-4": "Washing Machine 4, Staircase D",
        clubroom: "Clubroom – Ground Floor",
    };

    const descriptionMap = {
        sauna: "Reserved sauna session",
        laundry: "Reserved laundry slot",
        clubroom: "Reserved clubroom time",
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedDate(new Date()); // Reset calendar to today
    };

    const handleReserve = (time, roomOverride, date = selectedDate) => {
        const room = roomOverride || activeRoom;
        const location = labelMap[room];
        const day = format(date, "EEEE");
        const dateKey = format(date, "yyyy-MM-dd");

        const isAlreadyReserved = reservedSlots.some(
            (slot) => slot.room === room && slot.time === time && slot.date === dateKey
        );
        if (isAlreadyReserved) return;

        const currentCount = reservations.filter(
            (r) => r.location === location && r.day === day
        ).length;
        if (currentCount >= 5) {
            alert(`You’ve reached the maximum of 5 reservations for ${location} on ${day}.`);
            return;
        }

        const newReservation = {
            id: Date.now(),
            day,
            time: `${time} - ${parseInt(time) + 1}:00`,
            location,
            description: descriptionMap[activeTab],
        };

        setReservations((prev) => [...prev, newReservation]);
        setReservedSlots((prev) => [...prev, { room, time, date: dateKey }]);
    };

    const handleCancel = (id) => {
        const canceled = reservations.find((r) => r.id === id);
        if (canceled) {
            const time = canceled.time.split(" - ")[0];
            const room = Object.keys(labelMap).find(
                (key) => labelMap[key] === canceled.location
            );
            const dateKey = format(selectedDate, "yyyy-MM-dd");
            setReservedSlots((prev) =>
                prev.filter((slot) => !(slot.room === room && slot.time === time && slot.date === dateKey))
            );
        }
        setReservations((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <main>
            <div className="booking-page">
                <BookingTabs activeTab={activeTab} setActiveTab={handleTabChange} />
                <div className="booking-layout">
                    <aside className="booking-sidebar">
                        <UserReservations reservations={reservations} onCancel={handleCancel} />
                        <BookingInstructions activeTab={activeTab} />
                    </aside>
                    <main className="booking-main">
                        <CalendarHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        <BookingSchedule
                            activeTab={activeTab}
                            activeRoom={activeRoom}
                            onReserve={handleReserve}
                            reservedSlots={reservedSlots}
                            selectedDate={selectedDate}
                        />
                    </main>
                </div>
            </div>
        </main>
    );
}
//<RoomSelector activeRoom={activeRoom} setActiveRoom={setActiveRoom} activeTab={activeTab} />
