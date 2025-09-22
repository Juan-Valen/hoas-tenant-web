import React from "react";

export default function FilterSidebar({ filters, setFilters }) {
  return (
    <aside className="filters">
      <h2>Filters</h2>
      <label>
        Category:
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
        </select>
      </label>

      <label>
        Max Price:
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
          placeholder="e.g. 100"
        />
      </label>

      <label>
        Sort By:
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="newest">Newest</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={filters.freeOnly}
          onChange={(e) =>
            setFilters({ ...filters, freeOnly: e.target.checked })
          }
        />
        Show only free items
      </label>
    </aside>
  );
}
