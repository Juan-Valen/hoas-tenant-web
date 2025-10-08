import React from "react";
import "./BookingTabs.css";
import { useReservationContext } from "../../contexts/ReservationContext";

export default function BookingTabs() {
    const tabs = ["washing machine", "dryer", "sauna", "clubroom"];
    const { activeTab, handleTabChange } = useReservationContext();

    return (
        <div className="booking-tabs-header">
            <div className="tab-buttons">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                        onClick={() => handleTabChange(tab)}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}
