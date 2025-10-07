import React, { useState, useEffect } from "react";

function AdminMarketplace() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all market items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/markets");
        if (!res.ok) throw new Error("Failed to fetch markets");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Could not load markets.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Approve/Reject
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setItems(items.map(item => (item._id === id ? updated : item)));
    } catch (err) {
      console.error(err);
      alert("Error updating status.");
    }
  };

  // Delete
  const deleteItem = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/markets/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete item");
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting item.");
    }
  };

  return (
    <div className="admin-content">
      <h2>Manage Marketplace Items</h2>

      {loading && <p>Loading items...</p>}
      {error && <p className="error">{error}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Seller</th>
            <th>Price</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="7">No products found.</td>
            </tr>
          ) : (
            items.map(item => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>{item.sellerName}</td>
                <td>{item.free ? "Free" : `$${item.price}`}</td>
                <td>{item.status || "Pending"}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => updateStatus(item._id, "Approved")}>Approve</button>
                  <button onClick={() => updateStatus(item._id, "Rejected")}>Reject</button>
                  <button onClick={() => deleteItem(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMarketplace;
