import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";

// Test component for the home page

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome!</h1>
      <p>Click below to open the login page:</p>
      <Link to="/login">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>Go to Login</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;


