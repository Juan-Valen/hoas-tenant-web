import React, { useState } from "react";
import "../styles/Marketplace.css";

export default function MarketForm({ onCreate, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Handle image selection and preview

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Accumulate images
    let newImages = [...images, ...files];
    if (newImages.length > 5) {
      newImages = newImages.slice(0, 5);
      alert("You can only upload up to 5 images.");
    }

    setImages(newImages);
    // Generate previews for all images
    const fileReaders = newImages.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(fileReaders).then(setPreviews);
  };

  // Remove an image before submit
  const handleRemoveImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
    setPreviews(previews.filter((_, i) => i !== idx));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price) {
      return alert("Please fill all required fields.");
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      return alert("Price must be a positive number.");
    }

    const user = localStorage.getItem('user');
    const ownerId = user ? JSON.parse(user).id : null;
    if (!ownerId) {
      return alert("User not authenticated.");
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", numericPrice);
    formData.append("owner_id", ownerId);
    images.forEach((img) => formData.append("images", img));

    // Optionally call onCreate
    if (onCreate) onCreate(formData);

    setTitle("");
    setDescription("");
    setPrice("");
    setImages([]);
    setPreviews([]);
  };

  return (
    <div className="market-form-overlay">
      <div className="market-form">
        <h3>List a Market Item</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title*:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label>
            Description*:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            Price*:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label>
            Images:
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "10px 0" }}>
            {previews.map((src, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <img src={src} alt={`Preview ${idx + 1}`} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }} />
                <button type="button" style={{ position: "absolute", top: 2, right: 2 }} onClick={() => handleRemoveImage(idx)}>
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn">
              Submit
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
