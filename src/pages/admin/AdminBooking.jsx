import React, { useState } from "react";
import BookingResourceModal from "../../components/admin/BookingResourceModal";
import Toast from "../../components/admin/Toast";
import TabSwitcher from "../../components/admin/TabSwitcher";
import "../../styles/AdminStyles.css";

export default function AdminBooking() {
  // Tabs: sauna, laundry, clubroom
  const [activeTab, setActiveTab] = useState("sauna");

  // List of resources
  const [resources, setResources] = useState([
    { id: 1, name: "Sauna 1", type: "sauna", location: "Staircase D", maxReservations: 5, description: "Reserved sauna session", openingHours: "16:00 - 22:00" },
    { id: 2, name: "Washing Machine 1", type: "laundry", location: "Staircase D", maxReservations: 2, description: "Reserved laundry slot", openingHours: "06:00 - 22:00" },
  ]);

  // Modal state
  const [modalResource, setModalResource] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ message: "", type: "" });

  // Open modal for add/edit
  const openModal = (resource = null) => {
    setModalResource(resource);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  // Add or update resource
  const handleSubmit = (formData) => {
    if (modalResource) {
      // Edit existing
      setResources((prev) =>
        prev.map((r) => (r.id === modalResource.id ? { ...r, ...formData } : r))
      );
      setToast({ message: "Resource updated successfully!", type: "success" });
    } else {
      // Add new
      const newResource = { id: Date.now(), ...formData };
      setResources((prev) => [...prev, newResource]);
      setToast({ message: "Resource added successfully!", type: "success" });
    }
    closeModal();
  };

  // Delete resource
  const handleDelete = (id) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    setToast({ message: "Resource deleted!", type: "success" });
  };

  // Filter resources by active tab
  const filteredResources = resources.filter((r) => r.type === activeTab);

  return (
    <div className="admin-booking-page">
      <h2>Manage Booking Resources</h2>

      {/* Tab navigation */}
      <TabSwitcher tabs={["sauna", "laundry", "clubroom"]} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Controls */}
      <div className="admin-controls">
        <button className="btn" onClick={() => openModal()}>
          Add New Resource
        </button>
      </div>

      {/* Resource Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Max Reservations</th>
            <th>Description</th>
            <th>Opening Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.length > 0 ? (
            filteredResources.map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>{res.name}</td>
                <td>{res.location}</td>
                <td>{res.maxReservations}</td>
                <td>{res.description}</td>
                <td>{res.openingHours}</td>
                <td>
                  <button onClick={() => openModal(res)}>Edit</button>
                  <button onClick={() => handleDelete(res.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No resources found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Add/Edit */}
      <BookingResourceModal
        show={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        resource={modalResource}
      />

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />

      {/* Preview of current bookings */}
      <div className="booking-preview">
        <h3>Preview of Current Bookings (Simulated)</h3>
        <ul>
          {filteredResources.map((r) => (
            <li key={r.id}>
              {r.name}: {r.maxReservations} max reservations, {r.openingHours}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
