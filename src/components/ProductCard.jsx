import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="desc">{product.description}</p>
        <p className={`price ${product.free ? "free" : ""}`}>{product.free ? "Free" : `$${product.price}`}</p>
        <p className="seller">Seller: {product.sellerName}</p>
      </div>
    </div>
  );
}
