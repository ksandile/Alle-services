import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'; // Import the CSS file

function Header() {
  const location = useLocation();

  return (
    <header>
      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        <Link to="/subscription" className={location.pathname === '/subscription' ? 'active' : ''}>Subscribe</Link> {/* Subscription Link */}
      </nav>
    </header>
  );
}

export default Header;
