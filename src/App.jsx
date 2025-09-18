import BookingPage from './pages/BookingPage';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminMarketplace from "./pages/admin/AdminMarketplace";
import AdminHousing from "./pages/admin/AdminHousing";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements.jsx";
import AdminReports from "./pages/admin/AdminReports";
import AdminBuildingFacilities from "./pages/admin/AdminBuildingFacilities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main site */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path='/booking' element={<BookingPage />} />
        </Route>

        {/* Admin site */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="facilities" element={<AdminBuildingFacilities />} />
          <Route path="marketplace" element={<AdminMarketplace />} />
          <Route path="housing" element={<AdminHousing />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
