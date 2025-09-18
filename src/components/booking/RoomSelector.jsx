import React from "react";
import "./RoomSelector.css";

export default function RoomSelector({ activeRoom, setActiveRoom, activeTab }) {
  const roomOptions = {
    sauna: ["sauna1", "sauna2"],
    laundry: [
      "washing-machine-1",
      "washing-machine-2",
      "washing-machine-3",
    //   "washing-machine-4",
    ],
    clubroom: ["clubroom"],
  };

  const labelMap = {
    sauna1: "Sauna 1",
    sauna2: "Sauna 2",
    "washing-machine-1": "Washing Machine 1",
    "washing-machine-2": "Washing Machine 2",
    "washing-machine-3": "Washing Machine 3",
    // "washing-machine-4": "Washing Machine 4",
    clubroom: "Clubroom",
  };

  return (
    <div className="room-selector">
      {roomOptions[activeTab].map((room) => (
        <button
          key={room}
          className={room === activeRoom ? "active" : ""}
          onClick={() => setActiveRoom(room)}
        >
          {labelMap[room]}
        </button>
      ))}
    </div>
  );
}
