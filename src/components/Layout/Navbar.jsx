import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiSearch } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, setIsAuthenticated, onSearch }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        credentials: "include", // important to include cookies
      });
  
      if (response.ok) {
        setIsAuthenticated(false);  // update React state
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-section navbar-left">
        <span className="navbar-logo">VaultIQ</span>
      </div>
      {/* Center: Search Bar (only when authenticated) */}
      <div className="navbar-section navbar-center">
        {isAuthenticated && (
          <div className="search-container" >
            <FiSearch className="navbar-search-icon" />
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Search files..."
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
      {/* Right: Nav Links/Account */}
      <div className="navbar-section navbar-right">
        {isAuthenticated && (
          <>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            <Link to="/account" className="navbar-link" title="Account"><FiUser style={{ verticalAlign: 'middle', fontSize: '1.2rem' }} /> Account</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 