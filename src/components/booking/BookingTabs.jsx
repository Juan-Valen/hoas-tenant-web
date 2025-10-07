import React from "react";
import "./BookingTabs.css";

export default function BookingTabs({ activeTab, setActiveTab }) {
  const tabs = ["washing machine", "dryer", "sauna", "clubroom"];

  return (
    <div className="booking-tabs-header">
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
