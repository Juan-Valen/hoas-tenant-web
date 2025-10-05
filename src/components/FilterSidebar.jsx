import React, { useState } from "react";
import "../styles/Marketplace.css";

export default function FilterSidebar({ onFilter, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterChange = () => {
    onFilter({
      category: selectedCategory,
      maxPrice: maxPrice ? Number(maxPrice) : null,
    });
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>

      <label>
        Category:
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          onBlur={handleFilterChange}
        >
          <option value="">All</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      <label>
        Max Price:
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handleFilterChange}
          placeholder="No limit"
        />
      </label>

      <button className="btn" onClick={handleFilterChange}>Apply</button>
    </div>
  );
}