import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReservationPage from "./components/Booking/ReservationPage";
// Later you can import SaunaPage, ProfilePage, etc.

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Booking" element={<ReservationPage />} />
        {/* Add other pages here */}
      </Routes>
    </Router>
  );
};

export default App;
