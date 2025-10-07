import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import BookingPage from './pages/BookingPage';
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminMarketplace from "./pages/admin/AdminMarketplace";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements.jsx";
import AdminReports from "./pages/admin/AdminReports";
import AdminBuildingFacilities from "./pages/admin/AdminBuildingFacilities";
import AdminBooking from "./pages/admin/AdminBooking.jsx";
import { useAuthContext } from "./contexts/AuthContext.jsx";

function App() {
    const { isAuthenticated } = useAuthContext();
    return (
        <BrowserRouter>
            <Routes>
                {/* Main site */}
                <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
                    <Route index element={<Home />} />
                    <Route path="marketplace" element={<Marketplace />} />
                    <Route path='booking' element={<BookingPage />} />
                </Route>

                {/* Admin site */}
                <Route path="/admin" element={isAuthenticated && isAuthenticated.status == 2 ? <AdminLayout /> : <Navigate to="/login" />}>
                    <Route index element={<AdminHome />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="facilities" element={<AdminBuildingFacilities />} />
                    <Route path="marketplace" element={<AdminMarketplace />} />
                    <Route path="booking" element={<AdminBooking />} />
                    <Route path="announcements" element={<AdminAnnouncements />} />
                    <Route path="reports" element={<AdminReports />} />
                </Route>

                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
