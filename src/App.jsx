import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingPage from './pages/BookingPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/booking' element={<BookingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
