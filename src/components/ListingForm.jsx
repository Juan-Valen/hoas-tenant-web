import React, { useState } from "react";
import "../styles/Marketplace.css";

export default function ListingForm({ onCreate, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [free, setFree] = useState(false);
  const [category, setCategory] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [images, setImages] = useState([""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || (!free && !price) || !sellerName) return alert("Fill required fields");

    onCreate({
      title,
      description,
      price: free ? 0 : Number(price),
      free,
      category,
      sellerName,
      images: images.filter(img => img),
    });

    setTitle(""); setDescription(""); setPrice(""); setFree(false); setCategory(""); setSellerName(""); setImages([""]);
  };

  const handleImageChange = (index, value) => {
    const updated = [...images]; updated[index] = value; setImages(updated);
  };
  const addImageField = () => setImages([...images, ""]);

  return (
    <div className="listing-form-overlay">
      <div className="listing-form">
        <h3>List a Product</h3>
        <form onSubmit={handleSubmit}>
          <label>Title*:<input value={title} onChange={e => setTitle(e.target.value)} /></label>
          <label>Description:<textarea value={description} onChange={e => setDescription(e.target.value)} /></label>
          <label>Free / Give Away:<input type="checkbox" checked={free} onChange={() => setFree(!free)} /></label>
          {!free && <label>Price*:<input type="number" value={price} onChange={e => setPrice(e.target.value)} /></label>}
          <label>Category:<input value={category} onChange={e => setCategory(e.target.value)} /></label>
          <label>Seller Name*:<input value={sellerName} onChange={e => setSellerName(e.target.value)} /></label>
          {images.map((img, idx) => <input key={idx} value={img} placeholder="Image URL" onChange={e => handleImageChange(idx, e.target.value)} />)}
          <button type="button" onClick={addImageField}>+ Add Image</button>
          <div className="form-buttons">
            <button type="submit" className="btn">Submit</button>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}