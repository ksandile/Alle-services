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
        <Link to="/sign-in" className={location.pathname === '/sign-in' ? 'active' : ''}>Sign In</Link> {/* Sign In Link */}
        <Link to="/sign-up" className={location.pathname === '/sign-up' ? 'active' : ''}>Sign Up</Link> {/* Sign Up Link */}
      </nav>
    </header>
  );
}

export default Header;
