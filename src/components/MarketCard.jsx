import React, { useEffect, useState } from "react";
import "../styles/Marketplace.css";

export default function MarketCard({ market }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      // Get image metadata
      const res = await fetch(`/api/markets/${market._id}/images`);
      if (!res.ok) return;
      const images = await res.json();

      // Get image files and create URLs
      const urls = await Promise.all(
        images.map(async (img) => {
          const imgRes = await fetch(`/api/markets/${market._id}/images/${img.id}`);
          const blob = await imgRes.blob();
          return URL.createObjectURL(blob);
        })
      );
      setImageUrls(urls);
    }

    fetchImages();
  }, [market._id]);

  return (
    <div className="market-card">
      <h4>{market.title}</h4>
      <p>{market.description}</p>
      <p>Price: ${market.price}</p>
      {/* <p>Owner ID: {market.owner_id}</p> */}
      <p>Owner: {market.owner_id?.name || "Unknown"}</p>
      <p>Created At: {new Date(market.createdAt).toLocaleDateString()}</p>
      <div className="market-images">
        {imageUrls.map((src, idx) => (
          <img key={idx} src={src} alt={`Market ${market.title} Image ${idx + 1}`} style={{ width: 100, borderRadius: 8 }} />
        ))}
      </div>
    </div>
  );
}