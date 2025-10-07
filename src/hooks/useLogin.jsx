import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useLogin() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const website = import.meta.env.VITE_API_URL || "";
    const url = website + "/api/users/login"
    const [isLoading, setIsLoading] = useState(null);
    const login = async (object) => {
        setIsLoading(true);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object),
        });
        const user = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            return "Something went wrong!";
        }

        // localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
    // store the full user object in context so components can read id/status/token
    setIsAuthenticated(user);
        setIsLoading(false);
    };

    return { login, isLoading };
}
