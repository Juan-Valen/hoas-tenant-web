import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);
export default function AuthContextProvider(props) {
    // isAuthenticated holds either false (not logged in) or the user object ({ id, status, email, token, ... })
    const stored = localStorage.getItem("user");
    const initial = stored ? JSON.parse(stored) : false;
    const [isAuthenticated, setIsAuthenticated] = useState(initial);
    const auth = { isAuthenticated, setIsAuthenticated };
    return (<AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>);
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within a AuthContextProvider");
    }
    return context;
}
