import React from "react";

export default function TabSwitcher({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="tab-switcher">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`btn ${activeTab === tab ? "active-tab" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}
