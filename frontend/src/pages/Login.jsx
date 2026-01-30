import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // 1. Import Axios
import "../styles/AdminLogin.css";

function Login() {
  const navigate = useNavigate(); // For redirecting after login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // 2. Make this function ASYNC
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // 3. Point this to your backend URL
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData,
      );

      // 4. Save the token returned by your backend
      const token = response.data.token;
      localStorage.setItem("token", token);

      alert("Login successful!");

      // 5. Redirect the user (e.g., to the menu or admin dashboard)
      navigate("/");
    } catch (err) {
      // Handle errors (wrong password, user doesn't exist, etc.)
      console.error("Login Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.error || "Login failed. Check your credentials.",
      );
    }
  }

  return (
    <div className="admin-login-container">
      <h1>Login</h1>
      <p className="sub-header">
        Sign in to manage your orders and reservations.
      </p>

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
      {/* NEW: Link to Register */}
      <p className="admin-link-text">
        New user? <Link to="/register">Register here</Link>
      </p>
      <p className="admin-link-text">
        Admin? <Link to="/AdminLogin">Login here</Link>
      </p>
    </div>
  );
}

export default Login;
