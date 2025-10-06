import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import "./styles/global.css";
import AuthContextProvider from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthContextProvider >
            <App />
        </AuthContextProvider >
    </StrictMode>
);
