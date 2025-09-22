import React, { useState } from "react";

export default function ListingForm({ onCreate, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    free: false,
    category: "",
    sellerName: "You",
    images: ["https://via.placeholder.com/200"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      ...form,
      price: form.free ? 0 : parseFloat(form.price),
    };
    onCreate(product);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>List an Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            required
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <label>
            <input
              type="checkbox"
              checked={form.free}
              onChange={(e) => setForm({ ...form, free: e.target.checked })}
            />
            Give away for free
          </label>
          <input
            type="number"
            placeholder="Price"
            required={!form.free}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            disabled={form.free}
          />
          <select
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
          </select>
          <div className="modal-actions">
            <button type="submit">Add Item</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
