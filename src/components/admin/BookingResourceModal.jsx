import React, { useState, useEffect } from "react";

export default function BookingResourceModal({ show, onClose, onSubmit, resource }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "sauna",
    location: "",
    maxReservations: 1,
    description: "",
    openingHours: "06:00 - 22:00",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (resource) {
      setFormData(resource);
    } else {
      setFormData({
        name: "",
        type: "sauna",
        location: "",
        maxReservations: 1,
        description: "",
        openingHours: "06:00 - 22:00",
      });
    }
    setError("");
  }, [resource, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.description || !formData.openingHours) {
      setError("Please fill all required fields.");
      return;
    }
    if (formData.maxReservations <= 0) {
      setError("Max reservations must be at least 1.");
      return;
    }
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{resource ? "Edit Resource" : "Add New Resource"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="sauna">Sauna</option>
            <option value="laundry">Laundry</option>
            <option value="clubroom">Clubroom</option>
          </select>
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <input type="number" name="maxReservations" placeholder="Max Reservations" value={formData.maxReservations} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input type="text" name="openingHours" placeholder="Opening Hours" value={formData.openingHours} onChange={handleChange} />
          {error && <p className="error">{error}</p>}
          <div className="modal-footer">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn">{resource ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
