import React from "react";
import { Link } from "react-router-dom";

function AdminHome() {
  const cards = [
    { id: 1, title: "Manage Users", link: "/admin/users" },
    { id: 2, title: "Marketplace Items", link: "/admin/marketplace" },
    { id: 3, title: "Manage Booking", link: "/admin/booking" },
    { id: 4, title: "Announcements", link: "/admin/announcements" },
    { id: 5, title: "Reports", link: "/admin/reports" },
    { id: 6, title: "Building Facilities", link: "/admin/facilities" },

  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-cards">
        {cards.map((card) => (
          <div className="admin-card" key={card.id}>
            <h3>{card.title}</h3>
            <Link to={card.link} className="btn">Open</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
