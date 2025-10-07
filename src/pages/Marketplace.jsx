import React, { useState, useEffect } from "react";
import MarketCard from "../components/MarketCard";
import MarketForm from "../components/MarketForm";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/Marketplace.css";

export default function Marketplace({ }) {
  const [markets, setMarkets] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

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

    console.log("Adding market:", market);
    // Debug: Log all formData entries if market is FormData
    if (market instanceof FormData) {
      for (let pair of market.entries()) {
        console.log(pair[0], pair[1]);
      }
    }

    try {
      let res;
      if (market instanceof FormData) {
        res = await fetch("/api/markets", {
          method: "POST",
          body: market,
        });
      } else {
        res = await fetch("/api/markets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(market),
        });
      }

      const response = await res.json();
      const data = response.market;

      if (!res.ok) {
        throw new Error(data.message || "Failed to create market");
        console.error("Error details:", data);
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
        <button onClick={() => setShowForm(true)}>+ List Item</button>
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
