import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css"; 

function AdminSignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Admin Registration Data:", formData);
  }

  return (
    <div className="admin-auth-container">
      <div className="auth-content">
        <h1 className="auth-title">Admin Register</h1>
        <p className="auth-subtitle">Please fill the form below to create your account.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="fullName"
            className="auth-input"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="auth-input"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="auth-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            className="auth-input"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        <p className="auth-footer">
          Already an Administrator? <Link to="/AdminLogin" className="register-link">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminSignup;