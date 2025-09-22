import React, { useState, useEffect } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import ListingForm from "../components/ListingForm";
import "../styles/Marketplace.css";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: "", maxPrice: "", freeOnly: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add new product
  const addProduct = async (product) => {
    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to create product");
      const saved = await res.json();
      setProducts([saved, ...products]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  // Apply filters
  const filteredProducts = products
    .filter(p => (!filters.category || p.category === filters.category))
    .filter(p => (!filters.maxPrice || p.free || p.price <= filters.maxPrice))
    .filter(p => (!filters.freeOnly || p.free));

  return (
    <main className="marketplace">
      <header className="marketplace-header">
        <h1>Marketplace</h1>
        <button onClick={() => setShowForm(true)}>+ Sell / Give Away</button>
      </header>

      <div className="marketplace-body">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <section className="product-grid">
          {loading && <p>Loading products...</p>}
          {error && <p className="error">{error}</p>}
          {filteredProducts.length === 0 && !loading && <p>No products found</p>}
          {filteredProducts.map(p => <ProductCard key={p._id} product={p} />)}
        </section>
      </div>

      {showForm && <ListingForm onCreate={addProduct} onClose={() => setShowForm(false)} />}
    </main>
  );
}
