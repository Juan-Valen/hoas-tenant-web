import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 HOAS – All rights reserved.</p>
      <nav>
        <a href="#announcements">Announcements</a>
        <a href="#messages">Messages</a>
        <a href="#forms">Forms</a>
        <Link to='/booking'>Booking</Link>
      </nav>
    </footer>
  );
}

export default Footer;

