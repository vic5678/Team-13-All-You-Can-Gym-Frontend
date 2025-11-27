import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleMenuClick = () => {
    // Navigate based on user role
    if (role === 'gymAdmin') {
      navigate('/AdminHome');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate(-1)} className="nav-button">
        <IoIosArrowBack />
      </button>
      <button onClick={handleMenuClick} className="nav-button">
        <FiMenu />
      </button>
    </nav>
  );
};

export default NavBar;
