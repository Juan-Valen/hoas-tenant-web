import React, { useState } from "react";
import "../styles/Marketplace.css";

export default function MarketForm({ onCreate, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !price) {
      return alert("Please fill all required fields.");
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      return alert("Price must be a positive number.");
    }

    onCreate({ title, description, price: numericPrice });

    setTitle("");
    setDescription("");
    setPrice("");
  };

  return (
    <div className="market-form-overlay">
      <div className="market-form">
        <h3>List a Market Item</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title*:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label>
            Description*:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            Price*:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <div className="form-buttons">
            <button type="submit" className="btn">
              Submit
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
