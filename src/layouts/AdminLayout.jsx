import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/AdminStyles.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/marketplace">Marketplace</Link></li>
            <li><Link to="/admin/booking">Booking Resources</Link></li>
            <li><Link to="/admin/announcements">Announcements</Link></li>
            <li><Link to="/admin/reports">Reports</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
