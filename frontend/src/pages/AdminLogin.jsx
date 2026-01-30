import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Need this for redirecting
import axios from "axios";
import "../styles/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // 1. Send request to the backend
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData,
      );

      const { token, role } = response.data;

      // 2. Check if the user is actually an admin
      if (role === "admin") {
        // Store auth data
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        alert("Admin Login Successful!");

        // 3. Redirect to Admin Dashboard
        navigate("/admin");
      } else {
        // If a regular customer tries to use the admin portal
        setError("Access Denied: You do not have admin privileges.");
      }
    } catch (err) {
      // Handle wrong credentials or server errors
      const message =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(message);
    }
  }

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <p className="sub-header">
        Please fill the form below to access the portal.
      </p>

      {/* Error Message Display */}
      {error && (
        <p
          style={{
            color: "#ff4d4d",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
