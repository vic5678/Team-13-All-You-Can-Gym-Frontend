import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/Header.css';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg'; // Import the logo

const Header = ({ title, subtitle, userIcon = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, userId } = useAuth();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    window.location.href = "/profile";
  };

  const handleLogoutClick = async () => {
    setIsMenuOpen(false);
    await logout();
    window.location.href = "/";  // go back to the login route you already have
  };
  
return (
    <div className="header-banner">
        <div className="header-icon-wrapper">
            <img src={logo} alt="Logo" className="header-logo" />
        </div>
        <div className="header-content">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </div>

        {/* User Icon and Menu */}
        {userIcon && (
            <div className="user-menu-container">
                <button onClick={handleMenuToggle} className="user-icon-button">
                    <FaUserCircle />
                </button>

                {isMenuOpen && (
                    <div className="user-popup-menu">
                        <button onClick={handleProfileClick} className="menu-item">My Profile</button>
                        <button onClick={handleLogoutClick} className="menu-item" style={{color: '#C0392B'}}>Log out</button>
                    </div>
                )}
            </div>
        )}
    </div>
);
};

export default Header;