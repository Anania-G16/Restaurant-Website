import { NavLink } from "react-router-dom"; // Added Link if you want to use both, but NavLink is better here
import "../styles/navbar.css";

import logo from "../assets/images/Logo.png";
import hamburger from "../assets/icons/hamburger.svg";

function Navbar() {
  return (
    <header>
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="YEA logo" />
          </NavLink>
        </div>

        {/* Hamburger icon */}
        <div className="hamburger-icon-container">
          <img
            src={hamburger}
            alt="menu"
            className="hamburger-icon"
          />
        </div>

        {/* Navigation links */}
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          
          {/* Changed these to NavLink to match your style and fixed the missing import issue */}
          
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        <NavLink 
  to="/AdminLogin" 
  className="nav-item-admin" 
  style={{ 
    whiteSpace: "nowrap", 
    display: "inline-flex", 
    alignItems: "center",
    marginLeft: "5px" 
  }}
>
  Admin Login
</NavLink> 
        </div>
      </div>
    </header>
  );
}

export default Navbar;