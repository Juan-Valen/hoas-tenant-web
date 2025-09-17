import React, { useState } from "react";

function AdminMarketplace() {
  const [items, setItems] = useState([
    { id: 1, title: "Used iPhone 13", seller: "John Doe", price: 500, status: "Pending" },
    { id: 2, title: "Wooden Dining Table", seller: "Jane Smith", price: 250, status: "Approved" },
    { id: 3, title: "Leather Jacket", seller: "Mike Ross", price: 80, status: "Pending" },
  ]);

  const updateStatus = (id, status) => {
    setItems(items.map(item => item.id === id ? { ...item, status } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>Manage Marketplace Items</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Seller</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.seller}</td>
              <td>${item.price}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => updateStatus(item.id, "Approved")}>Approve</button>
                <button onClick={() => updateStatus(item.id, "Rejected")}>Reject</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMarketplace;
