import React from "react";
import "./Sidebar.css";

const Sidebar = ({ reservations }) => {
  return (
    <div className="sidebar">
      {/* Reservations Box */}
      <div className="box reservations-box">
        <h3 className="box-title">YOUR RESERVATIONS</h3>
        <ul className="reservation-list">
          {reservations.length > 0 ? (
            reservations.map((item, index) => (
              <li key={index} className="reservation-item">
                {item}
              </li>
            ))
          ) : (
            <li>No reservations yet.</li>
          )}
        </ul>
      </div>

      {/* Profile Links */}
      <div className="box">
        <button className="sidebar-btn">User profile</button>
        <button className="sidebar-btn">Log out</button>
      </div>

      {/* Info Box */}
      <div className="box info-box">
        <h3 className="box-title">MAKING A RESERVATION FOR LAUNDRY ROOM</h3>
        <ul>
          <li>Turns are reserved first come first served basis.</li>
          <li>
            The next month is reservable starting at 00.00 on the first day of
            the previous month.
          </li>
          <li>
            Reservation can be cancelled without any time limit, but
            cancellations made less than 12 hours before the reserved time will
            be counted to the total amount of reservations.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
