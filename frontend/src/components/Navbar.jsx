import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

// Importing assets allows React to process them (hashing for cache busting)
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

        {/* Hamburger icon (for mobile responsiveness) */}
        <div className="hamburger-icon-container">
          <img
            src={hamburger}
            alt="menu"
            className="hamburger-icon"
          />
        </div>

        {/* Navigation links */}
        <div className="nav-links">
          {/* 'end' ensures Home isn't highlighted when on /about or /menu */}
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/reservation">Reservation</NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;