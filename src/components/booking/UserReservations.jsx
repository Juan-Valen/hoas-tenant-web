import React from "react";
import "./UserReservations.css";

export default function UserReservations({ reservations = [], onCancel }) {
  return (
    <div className="user-reservations">
      <h2>Your Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <ul>
          {reservations.map((res) => (
            <li key={res.id}>
              <div className="reservation-details">
                <div className="reservation-info">
                  <strong>{res.day}</strong> {res.time}
                  <br />
                  <span className="reservation-location">{res.location}</span>
                  <br />
                  <span className="reservation-description">{res.description}</span>
                </div>
                <button onClick={() => onCancel(res.id)}>Cancel</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
