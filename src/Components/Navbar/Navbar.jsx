import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router";
import { assets } from "../../assets/assets";
import { useSelector } from "react-redux";

/**
 * Navbar component for the E-commerce application.
 * Displays navigation links, a search bar, and user authentication options.
 * @param {Object} props - Component props.
 * @param {Function} props.setShowLogin - Function to toggle the login modal visibility.
 */
const Navbar = ({ setShowLogin }) => {
  const token = localStorage.getItem("token"); // User authentication token
  const [showDropdown, setShowDropdown] = useState(false); // State for showing/hiding the dropdown menu

  /**
   * Toggles the visibility of the user profile dropdown menu.
   */
  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  /**
   * Handles the user logout process.
   * Removes the authentication token from localStorage and hides the dropdown menu.
   */
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setShowDropdown(false);
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="nav-logo">
        <Link to={"/"}>
          <p>E-commerce</p>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search Products here" />
        <div className="magnifying">
          <img src={assets.searchPng} alt="Search Icon" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="nav-lists">
        <ul>
          <Link to={"/home"}>
            <li>Home</li>
          </Link>
          <Link to={"/categories"}>
            <li>Categories</li>
          </Link>
          <Link to={"/cart"}>
            <li>Cart</li>
          </Link>
          <Link to={"/contact-us"}>
            <li>Contact Us</li>
          </Link>
        </ul>
      </div>

      {/* Authentication Section */}
      <div className="authentication">
        {!token ? (
          // Log In Button
          <div className="sign-up-btn">
            <button onClick={() => setShowLogin(true)}>Log In</button>
          </div>
        ) : (
          // User Profile and Dropdown Menu
          <>
            <div className="user-profile" onClick={handleDropdownToggle}>
              <img src={assets.user} alt="User Profile" />
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                <ul>
                  <Link to={"/dashboard"}>
                    <li>Contact Us</li>
                  </Link>
                  <li>Orders</li>
                  <li onClick={handleLogOut}>Log Out</li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;