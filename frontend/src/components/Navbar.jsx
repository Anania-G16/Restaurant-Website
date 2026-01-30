import { NavLink } from "react-router-dom";
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
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          
          {/* Changed Admin Login to General Login */}
          <NavLink 
            to="/login" 
            className="nav-item-login" 
            style={{ 
              whiteSpace: "nowrap", 
              display: "inline-flex", 
              alignItems: "center",
              marginLeft: "5px" 
            }}
          >
            Login
          </NavLink> 
        </div>
      </div>
    </header>
  );
}

export default Navbar;