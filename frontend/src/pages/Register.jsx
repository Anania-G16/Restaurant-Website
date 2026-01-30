import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminLogin.css"; 

function Register() {
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

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Registration Data:", formData);
    alert("Account created successfully!");
  }

  return (
    <div className="admin-login-container">
      <h1>Register</h1>
      <p className="sub-header">Join us to start making reservations and orders.</p>

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

      {/* Redirect back to Login */}
      <p className="admin-link-text">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;