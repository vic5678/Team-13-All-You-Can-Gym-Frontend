import React from 'react';
import '../styles/Header.css';

const Header = ({ title, subtitle, icon }) => {
  return (
    <div className="header-banner">
      <div className="header-icon-wrapper">
        {icon}
      </div>
      <div className="header-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};

export default Header;