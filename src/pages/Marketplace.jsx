import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ListingForm from "../components/ListingForm";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/Marketplace.css";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/products");
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

  // Compute filtered products whenever products or filters change
  useEffect(() => {
    const filtered = products.filter((p) => {
      const categoryMatch =
        !filters.category || p.category === filters.category;
      const priceMatch = !filters.maxPrice || p.price <= filters.maxPrice;
      return categoryMatch && priceMatch;
    });
    setFilteredProducts(filtered);
  }, [products, filters]);

  // Extract unique categories
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  // Add a new product
  const addProduct = async (product) => {
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to create product");
      const newProduct = await res.json();
      setProducts([newProduct, ...products]);
      setShowForm(false);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <main className="marketplace">
      <header className="marketplace-header">
        <h1>Marketplace</h1>
        <button onClick={() => setShowForm(true)}>+ Sell / Give Away</button>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="marketplace-layout">
        <FilterSidebar onFilter={setFilters} categories={categories} />

        <div className="product-grid">
          {filteredProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>

      {showForm && (
        <ListingForm
          onCreate={addProduct}
          onClose={() => setShowForm(false)}
        />
      )}
    </main>
  );
}
