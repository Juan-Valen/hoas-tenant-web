import React from "react";
import { Link } from "react-router-dom";


function Header() {
  return (
    <header className="header">
      <div className="logo">HOAS</div>
      <nav>
        <a href="#announcements">Announcements</a>
        <a href="#messages">Messages</a>
        <a href="#forms">Forms</a>
        <Link to='/booking'>Booking</Link>
      </nav>
    </header>
  );
}

export default Header;
