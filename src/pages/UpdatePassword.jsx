import React, { useState } from "react";
import "../styles/LoginPage.css";

export default function UpdatePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // current password
  const [newPassword, setNewPassword] = useState(""); // updated password
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users/password", {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          updated_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password updated successfully!");
        // clear form
        setEmail("");
        setPassword("");
        setNewPassword("");

        // optional: redirect to login after success
        // window.location.href = "/login";
      } else {
        setMessage(data.message || "Failed to update password");
      }
    } catch (err) {
      setMessage("Server error: " + err.message);
    }
  };

  return (
    <div className="update-password-page">
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update Password</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
