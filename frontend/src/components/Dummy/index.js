import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import "./index.css"

const Dummy = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Your Logo</Link>
      </div>
      <nav className="navbar">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/services">Services</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Dummy;
