import React from "react";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Seller: {product.seller}</p>
      <div className="actions">
        <button>View Details</button>
        <button>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductCard;
