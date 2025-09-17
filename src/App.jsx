import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace"; // ✅ new import
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import Layout from "./layouts/Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="marketplace" element={<Marketplace />} /> {/* ✅ new route */}
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

