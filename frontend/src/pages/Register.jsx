import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios"; // Added Axios
import "../styles/AdminLogin.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Updated to ASYNC for the API call
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Mapping 'fullName' from frontend to 'name' for backend
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(
        "http://localhost:5000/auth/register",
        payload,
      );

      alert(response.data.message || "Account created successfully!");

      // After registration, send them to login
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.error ||
          "Registration failed. Try a different email.",
      );
    }
  }

  return (
    <div className="admin-login-container">
      <h1>Register</h1>
      <p className="sub-header">
        Join us to start making reservations and orders.
      </p>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
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
          Create Account
        </button>
      </form>

      <p className="admin-link-text">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
