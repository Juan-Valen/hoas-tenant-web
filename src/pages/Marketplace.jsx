import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import "../styles/MarketplaceStyles.css";

function Marketplace() {
  const sampleProducts = [
    {
      id: 1,
      title: "Used iPhone 13",
      price: 500,
      seller: "John Doe",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      title: "Wooden Dining Table",
      price: 250,
      seller: "Jane Smith",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      title: "Leather Jacket",
      price: 80,
      seller: "Mike Ross",
      image: "https://via.placeholder.com/200"
    }
  ];

  const [filters, setFilters] = useState({});

  const filteredProducts = sampleProducts.filter((p) => {
    const categoryMatch =
      !filters.category || p.title.toLowerCase().includes(filters.category);
    const priceMatch = !filters.maxPrice || p.price <= filters.maxPrice;
    return categoryMatch && priceMatch;
  });

  return (
    <div className="marketplace">
      <h1>Marketplace</h1>
      <FilterBar onFilter={setFilters} />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Marketplace;
