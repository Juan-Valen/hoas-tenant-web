import React, { useState } from "react";

function AdminBuildingFacilities() {
  // Sample data for building facilities
  const [facilities, setFacilities] = useState([
    { id: 1, name: "Gym", status: "Available" },
    { id: 2, name: "Laundry Room", status: "Available" },
    { id: 3, name: "Conference Hall", status: "Under Maintenance" },
    { id: 4, name: "Bicycle Storage", status: "Available" },
  ]);

  const updateStatus = (id, status) => {
    setFacilities(facilities.map(facility => 
      facility.id === id ? { ...facility, status } : facility
    ));
  };

  const deleteFacility = (id) => {
    setFacilities(facilities.filter(facility => facility.id !== id));
  };

  return (
    <div>
      <h2>Manage Building Facilities</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Facility</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map(facility => (
            <tr key={facility.id}>
              <td>{facility.id}</td>
              <td>{facility.name}</td>
              <td>{facility.status}</td>
              <td>
                <button onClick={() => updateStatus(facility.id, "Available")}>Set Available</button>
                <button onClick={() => updateStatus(facility.id, "Under Maintenance")}>Set Maintenance</button>
                <button onClick={() => deleteFacility(facility.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBuildingFacilities
