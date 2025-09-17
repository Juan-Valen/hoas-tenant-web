import React from 'react';
import './LaundryBooking.css';

const LaundryBooking = ({ date, reservationsUsed, maxReservations, schedule }) => {
  const washingMachines = ['Washing Machine 1', 'Washing Machine 2', 'Washing Machine 3', 'Washing Machine 4'];
  const timeSlots = Object.keys(schedule);

  return (
    <div className="laundry-container">
      {/* Tab Row */}
      <div className="laundry-tabs">
        <button className="tab">LAUNDRY, STAIRCASE D</button>
        <button className="tab">DRYERS, STAIRCASE D</button>
      </div>

      {/* Centered Title Row */}
      <div className="laundry-title">
        LAUNDRY, STAIRCASE D
      </div>

      {/* Date Selector Row */}
      <div className="laundry-date-row">
        <span className="laundry-date">{date}</span>
        <span className="calendar-icon">📅</span>
      </div>

      {/* Reservation Summary */}
      <div className="reservation-summary">
        RESERVATIONS USED THIS WEEK: {reservationsUsed} OUT OF {maxReservations}
      </div>

      {/* Grid Header */}
      <div className="laundry-grid">
        <div className="laundry-row header-row">
          <div className="time-label">Time</div>
          {washingMachines.map((machine, index) => (
            <div key={index} className="machine-label">{machine.toUpperCase()}</div>
          ))}
        </div>

        {/* Time Slot Rows */}
        {timeSlots.map((time) => (
          <div key={time} className="laundry-row">
            <div className="time-label">{time}</div>
            {schedule[time].map((status, i) => (
              <div key={i} className={`slot ${status.toLowerCase()}`}>
                {status.toUpperCase()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaundryBooking;
