import React, { useState, useEffect } from "react";
import MarketCard from "../components/MarketCard";
import MarketForm from "../components/MarketForm";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/Marketplace.css";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Marketplace() {
  const [markets, setMarkets] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const userId = isAuthenticated ? (isAuthenticated.id ?? isAuthenticated._id ?? null) : null;

  // Fetch markets from backend
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/markets");
  if (!res.ok) throw new Error("Failed to fetch markets");
  const data = await res.json();
  setMarkets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkets();
  }, []);

  // Filter markets by maxPrice
  useEffect(() => {
    const filtered = markets.filter((m) => {
      return !filters.maxPrice || m.price <= filters.maxPrice;
    });
    setFilteredMarkets(filtered);
  }, [markets, filters]);

  // Add a new market
  const addMarket = async (market) => {
    if (!userId) {
      return alert("User not logged in. Cannot create market item.");
    }

    // Basic client-side validation to avoid server 400s
    if (!market.title || !market.description || market.price == null) {
      return alert("Please provide title, description and price.");
    }

    if (typeof market.price !== "number" || market.price < 0) {
      return alert("Price must be a non-negative number.");
    }

    try {
      const res = await fetch("/api/markets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...market, owner_id: userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Create market failed", data);
        throw new Error(data.message || "Failed to create market");
      }

      setMarkets([data, ...markets]);
      setShowForm(false);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <main className="marketplace">
      <header className="marketplace-header">
        <h1>Marketplace</h1>
        <button
          onClick={() => setShowForm(true)}
          disabled={!userId}
          title={!userId ? "Log in to list items" : "List a new item"}
        >
          {userId ? "+ List Item" : "Log in to list"}
        </button>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="marketplace-layout">
        <FilterSidebar onFilter={setFilters} />

        <div className="market-grid">
          {filteredMarkets.length === 0 && !loading && (
            <p>No items match your filters.</p>
          )}
          {filteredMarkets.map((m) => (
            <MarketCard key={m._id} market={m} />
          ))}
        </div>
      </div>

      {showForm && (
        <MarketForm onCreate={addMarket} onClose={() => setShowForm(false)} />
      )}
    </main>
  );
}
