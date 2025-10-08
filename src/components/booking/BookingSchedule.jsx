import { useEffect, useState } from "react";
import TimeSlots from "./TimeSlots";
import { useReservationContext } from "../../contexts/ReservationContext";
import "./BookingSchedule.css";

function Calendar() {
    const { activeTab } = useReservationContext()
    const [reservables, setReservables] = useState([]);
    const [load, setLoad] = useState(true);
    const url = "http://localhost:4000";
    const getMachines = async () => {
        const response = await fetch(url + "/api/reservations/reservables", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: activeTab }),
        });
        const reservableList = await response.json();
        setReservables(reservableList);
        setLoad(false)
    }
    useEffect(() => {
        getMachines();
    }, [activeTab])
    return (
        <div className="booking-schedule">
            <div className="schedule-grid">
                {!load && reservables.map((r) => {
                    return (
                        <div key={r._id} className="schedule-column">
                            <h4>{activeTab + " " + r.identifier}</h4>
                            <ul>
                                {activeTab == "washing machine" && <TimeSlots start={8} end={21} cycles={1} _id={r._id} type="Item" />}
                                {activeTab == "dryer" && <TimeSlots start={8} end={21} cycles={1} _id={r._id} type="Item" />}
                                {activeTab == "sauna" && <TimeSlots start={8} end={20} cycles={2} _id={r._id} type="Space" />}
                                {activeTab == "clubroom" && <TimeSlots start={0} end={24} cycles={6} _id={r._id} type="Space" />}

                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Calendar;
