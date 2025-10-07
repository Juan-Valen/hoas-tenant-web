import React, { useState, useEffect } from "react";

export default function AdminMarketplace() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all market items
  useEffect(() => {
    const fetchMarkets = async () => {
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
    fetchMarkets();
  }, []);

  // Delete market
  const deleteMarket = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/markets/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete item");
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      alert("Error deleting item: " + err.message);
    }
  };

  return (
    <div className="admin-content">
      <h2>Admin Marketplace</h2>

      {loading && <p>Loading items...</p>}
      {error && <p className="error">{error}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6">No items found.</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>${item.price}</td>
                <td>{item.owner_id}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => deleteMarket(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

