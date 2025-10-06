import React from "react";
import "../styles/Marketplace.css";

export default function MarketCard({ market }) {
  return (
    <div className="market-card">
      <h4>{market.title}</h4>
      <p>{market.description}</p>
      <p>Price: ${market.price}</p>
      <p>Owner ID: {market.owner_id}</p>
      <p>Created At: {new Date(market.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
