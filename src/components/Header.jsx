import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="logo">HOAS</div>
      <nav>
        <a href="#announcements">Announcements</a>
        <a href="#messages">Messages</a>
        <a href="#forms">Forms</a>
        <a href="#booking">Booking</a>
      </nav>
    </header>
  );
}

export default Header;
