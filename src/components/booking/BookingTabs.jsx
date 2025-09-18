import React from "react";
import "./BookingTabs.css";

export default function BookingTabs({ activeTab, setActiveTab }) {
  const tabs = ["laundry", "sauna", "clubroom"];

  return (
    <div className="booking-tabs-header">
      <div className="logo-section">
        <div className="logo-box">HOAS</div>
        <span className="logo-text">Booking</span>
      </div>
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
