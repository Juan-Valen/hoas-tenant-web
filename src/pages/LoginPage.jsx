import React, { useState } from "react";
import "../styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email validation
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Password strength validation (at least 6 characters, one number, one letter)
  const isStrongPassword = (password) =>
    password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password);

  return (
    <div className="login-container">
      <h1>Login</h1>

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={email ? (isValidEmail(email) ? "valid" : "invalid") : ""}
      />
      {email && (
        <p className={isValidEmail(email) ? "success-text" : "error-text"}>
          {isValidEmail(email) ? "Valid email ✔️" : "Invalid email"}
        </p>
      )}

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={password ? (isStrongPassword(password) ? "valid" : "invalid") : ""}
      />
      {password && (
        <p className={isStrongPassword(password) ? "success-text" : "error-text"}>
          {isStrongPassword(password)
            ? "Strong password 💪"
            : "Weak password (at least 6 chars, number, and letter)"}
        </p>
      )}

      <button className="login-btn">Login</button>
    </div>
  );
}

export default LoginPage;
