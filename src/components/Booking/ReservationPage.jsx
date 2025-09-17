import React from "react";
import Sidebar from "./Sidebar";
import LaundryBooking from "./LaundryBooking";
import "./ReservationPage.css";

const ReservationPage = () => {
  const reservations = [
    "On Mondays 18:00 - 20:00 - Sauna 1, staircase D - Lenkki sauna for men",
    "On Mondays 18:00 - 20:00 - Sauna 2, staircase E - Lenkki sauna for ladies",
  ];

  const schedule = {
    "11:00": ["Reserved", "Vacant", "Vacant", "Vacant"],
    "12:00": ["Vacant", "Vacant", "Vacant", "Vacant"],
    "13:00": ["Vacant", "Vacant", "Vacant", "Vacant"],
    "14:00": ["Vacant", "Vacant", "Vacant", "Vacant"],
    "15:00": ["Vacant", "Vacant", "Vacant", "Vacant"],
    "16:00": ["Vacant", "Vacant", "Vacant", "Vacant"],
    "17:00": ["Reserved", "Vacant", "Vacant", "Vacant"],
    "18:00": ["Vacant", "Reserved", "Reserved", "Vacant"],
    "19:00": ["Vacant", "Vacant", "Vacant", "Vacant"],
    "20:00": ["Reserved", "Vacant", "Vacant", "Vacant"],
    "21:00": ["Vacant", "Vacant", "Vacant", "Vacant"],
  };

  return (
    <div className="reservation-page">
      <Sidebar reservations={reservations} />

      <div className="reservation-content">
        <LaundryBooking
          date="THURSDAY 04.09.2025"
          reservationsUsed={6}
          maxReservations={10}
          schedule={schedule}
        />
      </div>
    </div>
  );
};

export default ReservationPage;
