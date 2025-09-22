import React, { useState, useEffect } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import ListingForm from "../components/ListingForm";
import "../styles/Marketplace.css";

export default function Marketplace() {
  const [filters, setFilters] = useState({
    category: "",
    maxPrice: "",
    sort: "newest",
    freeOnly: false,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://localhost:5000/products"); // adjust port if needed
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Submit new product to backend
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
      alert("Error: " + err.message);
    }
  };

  const filteredProducts = products
    .filter((p) => (!filters.category || p.category === filters.category))
    .filter((p) => (!filters.maxPrice || p.free || p.price <= filters.maxPrice))
    .filter((p) => (!filters.freeOnly || p.free))
    .sort((a, b) => {
      if (filters.sort === "priceLowHigh")
        return (a.free ? 0 : a.price) - (b.free ? 0 : b.price);
      if (filters.sort === "priceHighLow")
        return (b.free ? 0 : b.price) - (a.free ? 0 : a.price);
      return new Date(b.createdAt) - new Date(a.createdAt); // newest first
    });

  return (
    <main className="marketplace">
      <header className="marketplace-header">
        <h1>Marketplace</h1>
        <button className="sell-btn" onClick={() => setShowForm(true)}>
          + Sell / Give Away
        </button>
      </header>

      <div className="marketplace-body">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <section className="product-grid">
          {loading && <p>Loading products...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && filteredProducts.length === 0 && (
            <p>No products found.</p>
          )}
          {!loading &&
            !error &&
            filteredProducts.map((p) => <ProductCard key={p._id} product={p} />)}
        </section>
      </div>

      {showForm && (
        <ListingForm onCreate={addProduct} onClose={() => setShowForm(false)} />
      )}
    </main>
  );
}
