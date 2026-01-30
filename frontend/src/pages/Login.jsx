import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminLogin.css"; 

function Login() {
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

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert("Login attempt submitted!");
  }

  return (
    <div className="admin-login-container">
      <h1>Login</h1>
      <p className="sub-header">Sign in to manage your orders and reservations.</p>

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

      {/* The Admin Link */}
      <p className="admin-link-text">
        Admin? <Link to="/AdminLogin">Login here</Link>
      </p>
    </div>
  );
}

export default Login;