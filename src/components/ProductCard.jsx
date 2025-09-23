import React from "react";
import "../styles/Marketplace.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      {product.images[0] && <img src={product.images[0]} alt={product.title} />}
      <h4>{product.title}</h4>
      <p>{product.description}</p>
      <p>Category: {product.category || "N/A"}</p>
      <p>Seller: {product.sellerName}</p>
      <p>{product.free ? "Free / Giveaway" : `$${product.price}`}</p>
    </div>
  );
}
