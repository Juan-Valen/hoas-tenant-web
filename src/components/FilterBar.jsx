import React, { useState } from "react";

function FilterBar({ onFilter }) {
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    onFilter({ category, maxPrice });
  };

  return (
    <div className="filter-bar">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
        <option value="clothing">Clothing</option>
      </select>
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button onClick={handleFilter}>Apply</button>
    </div>
  );
}

export default FilterBar;
