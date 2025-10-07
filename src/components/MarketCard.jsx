import React from "react";
import "../styles/Marketplace.css";

export default function MarketCard({ market }) {
  if (!market) return null;

  const title = market.title || "Untitled Item";
  const description = market.description || "No description provided.";
  const price = market.price != null ? market.price : "N/A";
  const ownerId = market.owner_id || "Unknown";
  const createdAt = market.createdAt
    ? new Date(market.createdAt).toLocaleDateString("en-GB") // => "7/10/2025"
    : "N/A";

  // Convert "7/10/2025" → "7.10.2025"
  const formattedDate = createdAt.replace(/\//g, ".");

  return (
    <div className="market-card">
      <h4>{title}</h4>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <p>Owner ID: {ownerId}</p>
      <p>Created At: {formattedDate}</p>
    </div>
  );
}
