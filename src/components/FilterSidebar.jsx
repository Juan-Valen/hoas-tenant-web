import React, { useState } from "react";
import "../styles/Marketplace.css";

export default function FilterSidebar({ onFilter }) {
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterChange = () => {
    onFilter({ maxPrice: maxPrice ? Number(maxPrice) : null });
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>
      <label>
        Max Price:
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="No limit"
        />
      </label>
      <button className="btn" onClick={handleFilterChange}>
        Apply
      </button>
    </div>
  );
}
